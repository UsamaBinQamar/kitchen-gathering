
-- 1. recipe_ratings: require authentication to view
DROP POLICY IF EXISTS "Ratings are viewable by everyone" ON public.recipe_ratings;
CREATE POLICY "Ratings viewable by authenticated users"
ON public.recipe_ratings
FOR SELECT
TO authenticated
USING (true);

-- 2. recipe_ratings UPDATE: add WITH CHECK
DROP POLICY IF EXISTS "Users can update own ratings" ON public.recipe_ratings;
CREATE POLICY "Users can update own ratings"
ON public.recipe_ratings
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. recipes UPDATE: add WITH CHECK
DROP POLICY IF EXISTS "Users can update own recipes" ON public.recipes;
CREATE POLICY "Users can update own recipes"
ON public.recipes
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. user_roles: add explicit restrictive policy denying non-admin writes
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Revoke EXECUTE on has_role from public/anon/authenticated; only RLS policies (which run as definer) need it
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- 6. Restrict listing on recipe-images bucket (still allow direct file access by URL)
DROP POLICY IF EXISTS "Recipe images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for recipe-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view recipe images" ON storage.objects;

-- Allow public SELECT only for specific object access (not bucket listing).
-- Since public buckets serve files via CDN URLs without needing SELECT policy,
-- we only allow authenticated users to list/query the table.
CREATE POLICY "Authenticated users can view recipe image objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'recipe-images');

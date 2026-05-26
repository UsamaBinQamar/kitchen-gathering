
CREATE TABLE public.recipe_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  rating numeric(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5 AND (rating * 2) = floor(rating * 2)),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

ALTER TABLE public.recipe_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are viewable by everyone"
  ON public.recipe_ratings FOR SELECT USING (true);

CREATE POLICY "Users can insert own ratings"
  ON public.recipe_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON public.recipe_ratings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings"
  ON public.recipe_ratings FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER recipe_ratings_updated_at
  BEFORE UPDATE ON public.recipe_ratings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_recipe_ratings_recipe ON public.recipe_ratings(recipe_id);

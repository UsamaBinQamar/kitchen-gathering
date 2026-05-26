insert into storage.buckets (id, name, public)
values ('recipe-images', 'recipe-images', true)
on conflict (id) do nothing;

create policy "Recipe images are publicly accessible"
on storage.objects for select
using (bucket_id = 'recipe-images');

create policy "Users can upload their own recipe images"
on storage.objects for insert
with check (
  bucket_id = 'recipe-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update their own recipe images"
on storage.objects for update
using (
  bucket_id = 'recipe-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own recipe images"
on storage.objects for delete
using (
  bucket_id = 'recipe-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);
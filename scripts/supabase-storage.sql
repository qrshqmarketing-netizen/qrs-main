-- Pictures uploaded from the team dashboard (app/api/admin/upload/route.js). Run once in the Supabase SQL Editor.
-- A PUBLIC bucket: anyone with a picture's address can see it (that is what a website picture is), but nobody can upload, replace or delete
-- except the website's server with the secret key (no storage policies exist, so the public and logged-in roles can't write).
-- The bucket itself refuses anything that isn't a picture and anything over 5 MB.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update
set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

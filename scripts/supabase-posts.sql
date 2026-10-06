-- The Supabase table for the blog articles (the dashboard at /admin/ edits it; the site reads it: lib/postsStore.js).
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
-- Then open /admin/ on the site, log in, and press "Import the articles from the site files" once.
--
-- The site stays a normal fast, pre-built site: it reads the published articles from this table, and the dashboard tells it to refresh
-- the pages after every save. If Supabase can't be reached, the site falls back to the articles in data/blog/posts.js.

create table if not exists public.posts (
  slug text primary key,                          -- the article's address: /blog/<slug>/ (never changed once published)
  title text not null,                            -- the H1
  keyword text not null,                          -- must appear in the title, meta title, meta description and first 100 words
  topics text[] not null default '{}',            -- what it covers (leak, repair, tile...): decides which pages show it as a related article
  meta_title text not null,
  meta_description text not null,
  date_published date not null,
  date_modified date,
  excerpt text not null default '',               -- the card text on the blog index
  image text,                                     -- the thumbnail and top picture (a /images/blog/... path)
  image_alt text,
  card_image text,                                -- a stand-in picture for cards only, until the article has its own image
  hero_image text,
  intro jsonb not null default '[]'::jsonb,       -- the paragraphs above the table of contents: ["...", "..."]
  sections jsonb not null default '[]'::jsonb,    -- [{ "heading": "...", "blocks": [...] }]
  faqs jsonb not null default '[]'::jsonb,        -- [{ "q": "...", "a": "..." }]
  closing jsonb,                                  -- { "heading": "...", "blocks": [...] }
  related text[] not null default '{}',           -- service pages to suggest under the article
  author text,
  noindex boolean not null default false,         -- keep out of search results and the sitemap (still listed on the blog index)
  status text not null default 'draft' check (status in ('draft', 'published')),
  home_slot smallint check (home_slot between 1 and 3),  -- the featured spot on the home page's article grid (1 to 3), empty = not featured
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Each home page spot holds one article
create unique index if not exists posts_home_slot_key on public.posts (home_slot) where home_slot is not null;
create index if not exists posts_status_published_idx on public.posts (status, date_published desc);

create or replace function public.posts_touch() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke execute on function public.posts_touch() from public, anon, authenticated;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts for each row execute function public.posts_touch();

-- Private: row level security on with no policies, so only the website's server (the secret key, role service_role) can read or write it.
-- The grant is explicit because a missing table grant is a "permission denied" even for service_role.
alter table public.posts enable row level security;
revoke all on public.posts from anon, authenticated;
grant select, insert, update, delete on public.posts to service_role;

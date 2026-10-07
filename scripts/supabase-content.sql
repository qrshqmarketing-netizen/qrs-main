-- Site text the team edits in the dashboard (/admin/content/), one row per piece: `key` names it (for example home_faqs) and `value` is its content.
-- Run once in the Supabase SQL Editor. Private like the other tables: row level security on with no policies, so only the website's server
-- (the secret key, role service_role) can read or write it.
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
revoke all on public.site_content from anon, authenticated;
grant select, insert, update, delete on public.site_content to service_role;

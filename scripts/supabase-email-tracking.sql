-- Email tracking (owner, November 12 2026): opens and clicks of the drip campaigns and the article newsletter (lib/emailTracking.js).
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
-- Run scripts/supabase-campaigns.sql and scripts/supabase-newsletter.sql first. Private tables like the others: row level security on with no
-- policies, only the website's server (the secret key, service_role) can read and write.

-- One row per open or click. send_kind says which table send_id is from: 'campaign' (campaign_sends.id) or 'newsletter' (newsletter_sends.id).
-- is_bot: the request came from a mail scanner or link checker (security gateways open every link), so the stats leave it out.
create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null,                           -- open, click
  send_kind text not null,                      -- campaign, newsletter
  send_id uuid not null,
  url text,                                     -- the link that was clicked
  user_agent text,
  is_bot boolean not null default false
);
create index if not exists email_events_send_idx on public.email_events (send_kind, send_id);
create index if not exists email_events_created_idx on public.email_events (created_at desc);

-- The newsletter's sends get an id too, so an open or click can point at its send
alter table public.newsletter_sends add column if not exists id uuid not null default gen_random_uuid();
create unique index if not exists newsletter_sends_id_idx on public.newsletter_sends (id);

alter table public.email_events enable row level security;
revoke all on public.email_events from anon, authenticated;
grant select, insert, update, delete on public.email_events to service_role;
grant select, insert, update, delete on public.newsletter_sends to service_role;

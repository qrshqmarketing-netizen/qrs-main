-- Newsletter (owner, November 12 2026): "email me the latest articles" in the footer and as a checkbox on the request forms; every new article
-- is emailed to the confirmed subscribers (lib/newsletter.js, run by the daily cron in app/api/posts/scheduled).
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
-- Like the leads table, these tables are private: row level security on with no policies, so only the website's server (the secret key,
-- service_role) can read and write them. Unsubscribed addresses are also kept in email_suppressions (scripts/supabase-campaigns.sql).

-- Everyone who asked for the articles. status: pending (asked, hasn't clicked the confirmation link yet), confirmed (gets the emails),
-- unsubscribed. Double opt-in: only confirmed addresses are emailed.
create table if not exists public.newsletter_subscribers (
  email text primary key,                       -- always lowercase
  name text,
  source text,                                  -- footer, estimate-form, quick-form, start-form, instant-quote
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  confirm_sent_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);
create index if not exists newsletter_subscribers_status_idx on public.newsletter_subscribers (status);

-- One row per article and address emailed, so a run that stops halfway carries on where it left off and nobody gets an article twice
create table if not exists public.newsletter_sends (
  slug text not null,
  email text not null,
  sent_at timestamptz not null default now(),
  resend_id text,
  error text,
  primary key (slug, email)
);

-- An article whose emails are all sent (or that had nobody to send to)
create table if not exists public.newsletter_issues (
  slug text primary key,
  done_at timestamptz not null default now(),
  recipients integer not null default 0
);

alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_sends enable row level security;
alter table public.newsletter_issues enable row level security;

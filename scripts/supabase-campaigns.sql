-- Drip campaigns for the dashboard (owner, November 9 2026): app/admin/campaigns, lib/drips.js. Email series sent through Resend to the leads in a
-- chosen status (Remarketing by default), one step at a time, with an unsubscribe link in every email.
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
-- Like the leads table, these tables are private: row level security on with no policies, no access for anon or authenticated, and only the
-- website's server (the secret key, service_role) can read and write them.

-- A campaign: its name, which leads it is for (a lead status), whether it is sending, and its emails in order.
-- steps: [{ "delay_days": 0, "subject": "...", "body": "..." }, ...]; a step's delay is counted from the step before it (the first, from enrollment).
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  audience_status text not null default 'remarketing',
  active boolean not null default false,
  steps jsonb not null default '[]'::jsonb
);

-- One row per lead in a campaign: which step it is on and when the next email is due.
-- state: active (still sending), completed (got every step), stopped (its status changed), unsubscribed, failed (Resend refused it)
create table if not exists public.campaign_enrollments (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  lead_id uuid not null references public.leads (id) on delete cascade,
  email text not null,
  enrolled_at timestamptz not null default now(),
  step integer not null default 0,            -- the next step to send (0 = the first)
  next_send_at timestamptz,
  last_sent_at timestamptz,
  state text not null default 'active',
  last_error text,
  unique (campaign_id, lead_id)
);
create index if not exists campaign_enrollments_due_idx on public.campaign_enrollments (state, next_send_at);
create index if not exists campaign_enrollments_campaign_idx on public.campaign_enrollments (campaign_id);

-- Every email sent, for the campaign's numbers and the lead's history
create table if not exists public.campaign_sends (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz not null default now(),
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  step integer not null,
  email text not null,
  resend_id text,
  error text
);
create index if not exists campaign_sends_campaign_idx on public.campaign_sends (campaign_id, sent_at desc);

-- Addresses that unsubscribed (or that the team blocked): never emailed by any campaign again
create table if not exists public.email_suppressions (
  email text primary key,                     -- always lowercase
  created_at timestamptz not null default now(),
  reason text                                 -- unsubscribed, bounced, added by the team
);

alter table public.campaigns enable row level security;
alter table public.campaign_enrollments enable row level security;
alter table public.campaign_sends enable row level security;
alter table public.email_suppressions enable row level security;
revoke all on public.campaigns, public.campaign_enrollments, public.campaign_sends, public.email_suppressions from anon, authenticated;
grant select, insert, update, delete on public.campaigns, public.campaign_enrollments, public.campaign_sends, public.email_suppressions to service_role;

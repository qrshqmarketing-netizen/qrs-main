-- The Supabase table for the website's leads (lib/leads.js saves every lead here as well as emailing it and adding the spreadsheet row).
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
--
-- Then set two Environment Variables in Vercel (Settings -> Environment Variables) and redeploy:
--   SUPABASE_URL                the project URL (Project Settings -> API), like https://abcdefgh.supabase.co
--   SUPABASE_SERVICE_ROLE_KEY   the "service_role" (secret) key from the same page. NOT the anon / publishable key.
-- The service_role key can read and write everything, so it only goes in Vercel (and .env.local), never in the code: this repo is public.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  captured_at timestamptz,            -- when the website received it
  source text,                        -- Estimate form, Instant Quote, Roof Assistant chat, AI agent (MCP)
  name text,
  phone text,
  phone_digits text,                  -- the last 10 digits of the phone, so the same number typed any way matches
  email text,
  zip text,
  found_us text,
  service text,
  roof_type text,
  preferred_date date,                -- the visit date they asked for on /start/ (optional)
  preferred_time text,                -- Morning, Afternoon, Late afternoon or Flexible (optional)
  address text,
  message text,
  quote text,                         -- the Instant Quote's estimate details
  page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page text,
  transcript text,                    -- the chat conversation, for chat leads
  status text not null default 'new', -- for the team to follow up: change it in the Table Editor (new, contacted, scheduled, won, lost...)
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_phone_digits_idx on public.leads (phone_digits);
create index if not exists leads_email_idx on public.leads (lower(email));

-- Leads are private: turn on row level security with no policies, so only the service_role key (the website's server) can touch the table
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;

-- One row per person: the same phone number or email across the form, the Instant Quote and the chat is merged into one contact, with the
-- latest details, how many times they sent something, which sources, and when they were first and last seen. Nothing is deleted from
-- public.leads. Open it in the Table Editor (Views) or use: select * from public.lead_contacts order by last_seen desc;
create or replace view public.lead_contacts with (security_invoker = true) as
with keyed as (
  select *, coalesce(phone_digits, lower(email)) as contact_key
  from public.leads
  where coalesce(phone_digits, email) is not null
)
select distinct on (k.contact_key)
  k.contact_key,
  s.submissions,
  s.sources,
  s.first_seen,
  k.created_at as last_seen,
  k.name, k.phone, k.email, k.zip, k.service, k.roof_type, k.preferred_date, k.preferred_time, k.address, k.message, k.page, k.status
from keyed k
join (
  select contact_key, count(*) as submissions, array_agg(distinct source) as sources, min(created_at) as first_seen
  from keyed
  group by contact_key
) s using (contact_key)
order by k.contact_key, k.created_at desc;
revoke all on public.lead_contacts from anon, authenticated;

-- The Supabase tables behind the AI assistant and the lead function (supabase/functions/chat and supabase/functions/lead):
--   assistant_pages   what the assistant knows about the site: one row per page, article or FAQ, searched with Postgres full-text search
--   assistant_config  the assistant's instructions (system_prompt), editable here without a deploy
--   assistant_chats   a log of every question and answer (for tuning the assistant; kept 180 days if the optional cleanup below is on)
--   rate_limit_hits   the counter behind the functions' per-visitor limits
-- Run this once: Supabase dashboard -> SQL Editor -> New query -> paste this whole file -> Run. It is safe to run again.
-- Everything is private: row level security is on with no policies, and only the service_role key (the Edge Functions and the sync script) can use it.

create table if not exists public.assistant_pages (
  path text primary key,                 -- the page's address, like /roof-repair/
  kind text not null default 'page',
  name text not null,
  block text not null,                   -- the plain text the assistant is shown for this page
  search_text text not null,             -- everything searchable on the page
  updated_at timestamptz not null default now(),
  tsv tsvector generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') || setweight(to_tsvector('english', coalesce(search_text, '')), 'C')
  ) stored
);
create index if not exists assistant_pages_tsv_idx on public.assistant_pages using gin (tsv);

create table if not exists public.assistant_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.assistant_chats (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id text,
  ip_hash text,
  question text,
  reply text,
  model text,
  ms integer,
  pages text[],                          -- the pages the assistant was shown for this question
  error text,
  lead_saved boolean not null default false,
  utm_campaign text
);
create index if not exists assistant_chats_created_at_idx on public.assistant_chats (created_at desc);

create table if not exists public.rate_limit_hits (
  key text not null,
  hit_at timestamptz not null default now()
);
create index if not exists rate_limit_hits_key_idx on public.rate_limit_hits (key, hit_at desc);

-- Counts this hit and says whether the key has now used more than p_max hits in the last p_seconds
create or replace function public.rate_limited(p_key text, p_max integer, p_seconds integer)
returns boolean
language plpgsql
security invoker
set search_path = public
as $$
declare
  n integer;
begin
  insert into public.rate_limit_hits (key) values (p_key);
  select count(*) into n from public.rate_limit_hits where key = p_key and hit_at > now() - make_interval(secs => p_seconds);
  return n > p_max;
end;
$$;

-- The pages that best match a visitor's question: any of its words, best match first. Returns nothing for small talk (thanks, hello...).
create or replace function public.assistant_search(q text, n integer default 2)
returns table (path text, name text, block text, rank real)
language sql
stable
security invoker
set search_path = public
as $$
  with words as (
    select array_agg(distinct w) as ws
    from (
      select lower(w) as w
      from regexp_split_to_table(regexp_replace(coalesce(q, ''), '[^a-zA-Z0-9 ]', ' ', 'g'), '\s+') as w
      where length(w) > 2
    ) x
  ),
  tq as (
    select case when ws is null then null else to_tsquery('english', array_to_string(ws, ' | ')) end as query from words
  )
  select p.path, p.name, p.block, ts_rank_cd(p.tsv, tq.query)::real as rank
  from public.assistant_pages p, tq
  where tq.query is not null and p.tsv @@ tq.query and ts_rank_cd(p.tsv, tq.query) >= 0.05
  order by rank desc, p.path
  limit greatest(1, least(coalesce(n, 2), 5));
$$;

-- Private: only the website's server side (service_role) may use any of this
alter table public.assistant_pages enable row level security;
alter table public.assistant_config enable row level security;
alter table public.assistant_chats enable row level security;
alter table public.rate_limit_hits enable row level security;
revoke all on public.assistant_pages, public.assistant_config, public.assistant_chats, public.rate_limit_hits from anon, authenticated;
grant select, insert, update, delete on public.assistant_pages, public.assistant_config, public.assistant_chats, public.rate_limit_hits to service_role;
grant usage, select on sequence public.assistant_chats_id_seq to service_role;
revoke all on function public.rate_limited(text, integer, integer) from public, anon, authenticated;
revoke all on function public.assistant_search(text, integer) from public, anon, authenticated;
grant execute on function public.rate_limited(text, integer, integer) to service_role;
grant execute on function public.assistant_search(text, integer) to service_role;

-- OPTIONAL cleanup (run separately, after turning on the pg_cron extension: Dashboard -> Integrations -> Cron): chats are kept 180 days and the
-- rate counters 1 day, every night.
--   select cron.schedule('assistant-cleanup', '17 3 * * *', $job$
--     delete from public.assistant_chats where created_at < now() - interval '180 days';
--     delete from public.rate_limit_hits where hit_at < now() - interval '1 day';
--   $job$);

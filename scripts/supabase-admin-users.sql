-- Dashboard logins with Supabase Auth (lib/adminAuth.js). Since October 19 2026 people normally ask for an account themselves at /admin/register/
-- and an admin approves them on the dashboard's Team page (/admin/team/); nothing here is needed for that. This script is for marking the
-- FIRST admin by hand (or anyone made in Authentication → Users → Add user → Create new user, with "Auto Confirm User" ticked). The team
-- password (ADMIN_PASSWORD) also logs in and can approve accounts, so the owner can approve the first requests without this script.
--
-- 1. Mark the people who may use /admin/ (replace the emails; the role lives in app_metadata, which a user can't change themselves):
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email in ('marketing@qualityroofingspecialists.com');

-- 2. Check who has access:
select email, raw_app_meta_data ->> 'role' as role, last_sign_in_at from auth.users order by email;

-- 3. To remove someone: delete them under Authentication → Users (they lose dashboard access within a minute).
--
-- Also in the dashboard: Authentication → Sign In / Providers → keep "Allow new users to sign up" OFF. The site's /admin/register/ makes accounts
-- through the admin API with the secret key (always 'pending' until approved), so Supabase's own public sign-up isn't needed.
-- Personal accounts work whenever the site has SUPABASE_URL and SUPABASE_SECRET_KEY (SUPABASE_PUBLISHABLE_KEY is used for the login check when
-- it is set). To switch the shared team password off and allow personal accounts only, set ADMIN_AUTH=supabase in Vercel.

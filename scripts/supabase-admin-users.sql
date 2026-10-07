-- Dashboard logins with Supabase Auth (lib/adminAuth.js). Run in the Supabase SQL Editor AFTER creating each team member in
-- Authentication → Users → Add user → Create new user (type their email and a password, tick "Auto Confirm User").
--
-- 1. Mark the people who may use /admin/ (replace the emails; the role lives in app_metadata, which a user can't change themselves):
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email in ('marketing@qualityroofingspecialists.com');

-- 2. Check who has access:
select email, raw_app_meta_data ->> 'role' as role, last_sign_in_at from auth.users order by email;

-- 3. To remove someone: delete them under Authentication → Users (they lose dashboard access within a minute).
--
-- Also in the dashboard: Authentication → Sign In / Providers → turn OFF "Allow new users to sign up", so nobody else can make an account.
-- Then add SUPABASE_PUBLISHABLE_KEY (the sb_publishable_... key from Project Settings → API Keys) in Vercel and redeploy: /admin/ then asks for email + password.
-- To go back to the shared password, remove SUPABASE_PUBLISHABLE_KEY (and keep ADMIN_PASSWORD).

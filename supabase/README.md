# Running the assistant, the forms and the dashboard login on Supabase

What is here:

| Piece | Where it lives | What it does |
| --- | --- | --- |
| `chat` function | `functions/chat`, logic in `functions/_shared/chat.js` | The Roof Assistant: finds matching pages in the `assistant_pages` table, asks Gemini, saves a lead when a visitor shares a phone or email, logs every exchange in `assistant_chats`, limits each visitor to 30 messages per 10 minutes |
| `lead` function | `functions/lead`, logic in `functions/_shared/leadHandler.js` | The request form and Instant Quote: checks the fields, saves the `leads` row, emails the team, adds the Google Sheet row, sends the visitor's confirmation email |
| Dashboard login | `lib/adminAuth.js`, `lib/adminSession.js` | `/admin/` asks for email + password checked by Supabase Auth |
| Database script | `scripts/supabase-assistant.sql` | Tables and search for the assistant (run once) |
| Knowledge loader | `scripts/sync-assistant.mjs` | Copies the site's pages and articles into `assistant_pages` |

The website itself (Next.js on Vercel) and the AI-agent (MCP) route stay on Vercel. The old `/api/chat` and `/api/lead` routes also stay: the site calls them if a function can't be reached.

## One-time setup (about 20 minutes, from the project folder)

1. **Install the Supabase tool and log in**

   ```bash
   brew install supabase/tap/supabase
   supabase login
   supabase link --project-ref YOUR-PROJECT-REF
   ```

   The project ref is the part of the Supabase URL before `.supabase.co`.

2. **Create the tables.** In Supabase → SQL Editor, run `scripts/supabase-assistant.sql` (the `leads` and `posts` scripts were already run).

3. **Save the secrets** (they stay in Supabase; never put them in code or in chat). Use the same values that are in Vercel today:

   ```bash
   supabase secrets set GEMINI_API_KEY=... GEMINI_MODEL=gemini-3.1-pro-preview
   supabase secrets set RESEND_API_KEY=... LEADS_FROM_EMAIL="Quality Roofing Specialists <leads@yourdomain>"
   supabase secrets set LEADS_SHEET_WEBHOOK_URL=... LEADS_SHEET_SECRET=...
   supabase secrets set ALLOWED_ORIGINS="https://qualityroofingspecialists.com,https://www.qualityroofingspecialists.com,https://qrs-*.vercel.app"
   ```

   Optional: `LEADS_TO_EMAIL`, `OPENROUTER_API_KEY`, `CRM_LEAD_ENDPOINT`, `CRM_LEAD_TOKEN`, `LEADS_AUTOREPLY=off`, `CHAT_LOG=off`, `IP_SALT` (any random text). `SUPABASE_URL` and the secret key are supplied to the functions by Supabase itself.

4. **Deploy the functions**

   ```bash
   npm run functions:sync
   supabase functions deploy chat lead --no-verify-jwt
   ```

   Run `npm run functions:sync` again (and redeploy) whenever the confirmation email wording, the form choices or the assistant instructions change in `data/`.

5. **Load the assistant's knowledge** (needs `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in `.env.local`):

   ```bash
   npm run assistant:sync
   ```

   Run it again after changing page copy or publishing articles.

6. **Test the functions** before switching the site (use the same `LEADS_SHEET_SECRET` as in step 3):

   ```bash
   curl -s -X POST https://YOUR-PROJECT-REF.supabase.co/functions/v1/lead \
     -H 'content-type: application/json' -H 'x-leads-diagnostic: THE-SECRET' -d '{"configCheck":true}'
   ```

7. **Switch the site** in Vercel → Environment Variables, then redeploy:

   - `NEXT_PUBLIC_CHAT_ENDPOINT` = `https://YOUR-PROJECT-REF.supabase.co/functions/v1/chat`
   - `NEXT_PUBLIC_LEAD_ENDPOINT` = `https://YOUR-PROJECT-REF.supabase.co/functions/v1/lead`

   To go back, remove them: the site uses its own routes again.

8. **Dashboard logins.** Create each team member in Supabase → Authentication → Users, turn off new sign-ups, run `scripts/supabase-admin-users.sql`, then add `SUPABASE_PUBLISHABLE_KEY` in Vercel and redeploy. Create and test your own login first: with the key set, the shared password stops working. Removing the key brings it back.

## Pictures and site text in the dashboard

- **Picture uploads** (articles' image, card and hero pictures): in Supabase → SQL Editor run `scripts/supabase-storage.sql` once. The article editor then has an **Upload a picture** button under each picture box: JPEG, PNG, WebP or AVIF up to 4 MB, checked by its real contents, stored in the public `site-images` bucket under a new file name every time (so a replaced picture never shows an old cached copy), and shown through the site's image optimizer. Typing an address like `/images/blog/name.webp` still works. The site's own pictures in `public/images` stay where they are: Vercel serves those faster, so moving them would gain nothing.
- **Home page FAQ**: run `scripts/supabase-content.sql` once, then open **Home page FAQ** in the dashboard. The first save copies the site files' wording into the database; after that the dashboard is the place to edit it, and "Go back to the site files' copy" undoes it. The AI files (`llms.txt`) and the assistant's knowledge read the same text (run `npm run assistant:sync` after a change). Reviews, projects and page copy stay in `data/`: live Google reviews already replace the hand-picked ones, and the pages are structured code rather than plain text.

## Good to know

- The chat log (`assistant_chats`) holds what visitors typed, including any phone numbers or emails, for the team to read in Supabase. To delete old rows automatically, uncomment the cleanup at the bottom of `scripts/supabase-assistant.sql`.
- Supabase's free plan pauses a project after a week with no use; a paid plan avoids that for a site that takes leads.
- Test the code locally without deploying: `npm run functions:test`.

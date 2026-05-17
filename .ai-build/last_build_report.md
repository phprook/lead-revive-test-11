# Build Report — Connect Lead Form to Supabase

**Date:** 2026-05-17
**Result:** Build succeeded (`next build`, Next.js 16.2.6 / Turbopack)

## Summary
Verification pass. The lead form was already wired to Supabase in prior
commits (`Connect lead form to Supabase`, `Apply Supabase leads
migration`). This run reconfirmed every task constraint is satisfied and
that `npm run build` still passes cleanly. No code changes were needed.

## Wiring in place
- `src/lib/supabaseClient.ts` — small lazy singleton browser client using
  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from
  `.env.local`. The service role key is never referenced from frontend
  code.
- `src/lib/leads.ts` `submitLead()` inserts into `public.leads` using the
  existing columns only: `full_name`, `email`, `phone`, `interest_type`,
  `message`, `source` (= `"website"`). The UI value `"not-sure"` is
  mapped to the DB-allowed `"not_sure"` to satisfy the existing CHECK
  constraint.
- `src/app/components/LeadForm.tsx` keeps `validateLeadInput` and all
  field-level errors; on success it renders the existing success state;
  on Supabase error or thrown exception it shows the clear, non-technical
  message: *"Sorry, we couldn't send your details right now. Please try
  again in a moment."*
- `@supabase/supabase-js@^2.105.4` already present in `package.json`.
- `supabase/migrations/20260517212842_create_leads_table.sql` creates
  `public.leads`, enables RLS, and grants an `INSERT` policy to `anon`.

## Build output
```
✓ Compiled successfully in 8.3s
  Finished TypeScript in 6.0s
✓ Generating static pages (4/4) in 223ms
Route (app)
┌ ○ /
└ ○ /_not-found
```

## Preserved / non-actions
- Client-side validation and the existing success state untouched.
- No authentication added.
- No admin dashboard added.
- No new tables added.
- No secrets exposed; only the public anon key is used client-side.

## Notes
- Next.js warned about a sibling `package-lock.json` at
  `/home/ubuntu/ai-builds/` — pre-existing, unrelated to this change.
  Can be silenced with `turbopack.root` if desired.

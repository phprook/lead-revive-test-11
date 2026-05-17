# Build Report — Connect Lead Form to Supabase

**Date:** 2026-05-17
**Result:** Build succeeded (`next build`, Next.js 16.2.6)

## Summary
Wired the existing lead form to Supabase. Valid submissions now insert
into `public.leads` using the anon key from `.env.local`. Client-side
validation and the existing success state are preserved.

## Changes
- **Installed** `@supabase/supabase-js`.
- **Added** `src/lib/supabaseClient.ts` — small lazy singleton browser
  client using `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Service role key is never referenced.
- **Updated** `src/lib/leads.ts` `submitLead()` to insert into
  `public.leads` using the existing columns: `full_name`, `email`,
  `phone`, `interest_type`, `message`, `source`. `source` is set to
  `"website"`. The domain value `"not-sure"` is mapped to the DB-allowed
  `"not_sure"` to satisfy the existing check constraint.
- On Supabase error or thrown exception, returns a clear, non-technical
  message: *"Sorry, we couldn't send your details right now. Please try
  again in a moment."* The form's existing `submitError` alert path
  renders it.

## Preserved
- `validateLeadInput` and all field-level errors.
- The existing success state in `LeadForm.tsx` (no UI edits required).
- No new tables, no auth, no admin dashboard, no secrets committed.

## Build output
```
✓ Compiled successfully in 8.5s
  Finished TypeScript in 6.5s
✓ Generating static pages (4/4)
Route (app)
┌ ○ /
└ ○ /_not-found
```

## Notes
- Next.js warned about a sibling `package-lock.json` at
  `/home/ubuntu/ai-builds/` — pre-existing, unrelated to this change.
  Can be silenced with `turbopack.root` if desired.

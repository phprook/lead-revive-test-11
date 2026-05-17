# Build Report — FEATURE_005: Future lead storage preparation

## Summary
Refactored the lead form so submission goes through a single, swappable
boundary that already speaks the future database contract. No backend,
database, or third-party service was added.

## Changes
- **Added `src/lib/leads.ts`** — domain module that owns the future lead
  contract:
  - `Lead` type with DB-shaped fields (`fullName`, `email`, `phone`,
    `interest`, `message`, `submittedAt`). Optional contact fields are
    `string | null`, matching how a SQL row would store them.
  - `LeadInterest` union + `LEAD_INTEREST_OPTIONS` constant — single
    source of truth for the dropdown, the type system, and any future
    `interest` column.
  - `validateLeadInput` — pure validator returning field errors.
  - `buildLead` — normalizes raw form input into a clean `Lead` record.
  - `submitLead(lead)` — the single boundary where a backend integration
    will be wired in later (API route, Supabase client, CRM webhook).
    Currently a no-op that logs in development.
- **Refactored `src/app/components/LeadForm.tsx`** to import from the
  new lib: validation, the interest options, `buildLead`, and
  `submitLead`. Added a `submitting` state (button disables and shows
  "Sending…") and a `submitError` alert path so async failures from a
  future backend will surface without further refactor.

## Done-when check
- Submission logic organized so a backend can be added later — all
  persistence flows through `submitLead` in `src/lib/leads.ts`.
- Future lead fields easy to map to a database — `Lead` type uses flat,
  primitive fields with explicit nullability and an ISO timestamp.
- No Supabase credentials or production services added — no new deps,
  no env vars, no API routes.
- Code remains simple and understandable — one small lib file plus a
  minimal form refactor.

## Verified
- `npm run build` compiles, type-checks, and prerenders successfully.

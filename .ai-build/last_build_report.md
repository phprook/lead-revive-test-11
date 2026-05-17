# Build Report — FEATURE_003: Form validation and success message

## Status
Built successfully. `npx tsc --noEmit` is clean and `next build` compiles
`/` as a static page.

## Changes
- `src/app/components/LeadForm.tsx`
  - Converted to a Client Component (`"use client"`) so it can manage
    validation and submission state with `useState`.
  - Added an `onSubmit` handler that:
    - Reads `fullName`, `email`, and `phone` from `FormData`.
    - Requires `fullName`.
    - Requires at least one of `email` or `phone`.
    - Shows inline error messages with red borders and ARIA wiring
      (`aria-invalid`, `aria-describedby`).
    - Calls `event.preventDefault()` — no network call, no server action.
  - On a valid submission, swaps the form for a thank-you confirmation
    panel (`role="status"`).
  - Added `noValidate` so the custom validation messages are shown
    instead of the browser's native popovers.

## Done-when checks
- Full name is required — yes.
- At least one contact method (email or phone) is required — yes.
- User sees a helpful error message when required information is missing — yes
  (per-field inline messages with accessible wiring).
- Successful submission shows a thank-you / confirmation message — yes.
- Form does not attempt to save to a database — yes; no fetch, no server
  action, no external calls.

## Out of scope (intentionally skipped, per `do_not_do`)
- No Supabase or any database.
- No email sending.
- No server-side submission logic (no API route, no server action).
- No lead dashboard.
- No analytics tracking.

## Notes
- No new dependencies were added.
- The interest `<select>` retains its default value of "buying"; the
  optional message textarea is unchanged.

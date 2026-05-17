# MASTER_PRODUCT_BRIEF

## Product Vision

Build a simple, high-converting real estate lead follow-up landing page that helps agents, brokers, or real estate teams capture contact information from potential buyers, sellers, or past leads who need follow-up.

The page should feel professional, trustworthy, and easy to use. It should clearly explain why the visitor should submit their information and make the call to action obvious.

This is not a full real estate platform. It is a focused lead-capture landing page.

## Target User

Primary user:

- Real estate agent or real estate team that wants to collect and follow up with leads.

End visitor:

- A potential home buyer
- A potential home seller
- A past lead who may still be interested
- Someone responding to an ad, email, SMS, or social post

## Core Problem

Real estate leads often go cold because there is no simple, focused follow-up destination. Agents need a clean page where a lead can quickly say:

- “I’m still interested”
- “Contact me”
- “I want to talk about buying or selling”

The page should remove friction and capture the lead’s basic contact information.

## V1 Goal

Create a polished single-page landing page with:

- A strong headline
- A short supporting explanation
- A clear lead form
- A clear call to action
- A simple success message after form submission

For V1, the lead form can work without a database by showing a success confirmation in the browser. Persistent lead storage can be added later if needed.

# PRODUCT_ROADMAP

## FEATURE_001 — Basic Landing Page Structure

Create the first public landing page with a clean layout, headline, supporting text, and call-to-action section.

Purpose:

- Establish the main page structure.
- Make the page visually clear and professional.
- Do not build the form yet.

## FEATURE_002 — Lead Capture Form UI

Add a simple lead form to the landing page.

Fields:

- Full name
- Email
- Phone number
- Interest type: buying, selling, both, not sure
- Optional message

Purpose:

- Allow visitors to enter their contact details.
- Keep the form simple and easy to complete.

## FEATURE_003 — Client-Side Form Validation and Success State

Add basic validation and submission behavior.

Behavior:

- Require full name.
- Require at least one contact method: email or phone.
- Show validation messages if required fields are missing.
- On successful submission, show a confirmation message.

Purpose:

- Make the form feel complete without needing a backend yet.

## FEATURE_004 — Mobile Responsiveness and Visual Polish

Refine the page so it looks good on desktop and mobile.

Purpose:

- Improve spacing, typography, buttons, and form layout.
- Ensure the landing page is usable on phones.
- Keep the design clean and conversion-focused.

## FEATURE_005 — Optional Lead Storage Preparation

Prepare for future lead storage without fully adding Supabase unless approved.

Purpose:

- Define where form submission logic would go later.
- Avoid hardcoding decisions that make database integration difficult.
- Do not implement Supabase yet unless explicitly approved.

# TECH_ARCHITECTURE

## Recommended Stack

Use the default simple stack:

- Next.js
- Vercel
- GitHub
- Supabase later if needed

## Application Type

A simple Next.js web app with one public landing page.

Recommended route:

- `/` — landing page

## Frontend

Use standard React components in Next.js.

Suggested structure:

- `app/page.tsx` — main landing page
- `app/globals.css` — global styles
- Optional component files if the page becomes easier to maintain:
  - `components/HeroSection.tsx`
  - `components/LeadForm.tsx`
  - `components/SuccessMessage.tsx`

Keep the structure simple. Do not create unnecessary abstractions early.

## Styling

Use the project’s existing styling approach if already present.

If starting fresh, use simple CSS or Tailwind if already configured. Do not add a large design system.

Visual direction:

- Clean
- Professional
- Trustworthy
- Real estate appropriate
- Strong CTA button
- Good mobile spacing

## Backend

No backend is required for the first version.

For V1:

- Handle form submission on the client.
- Show a success message.
- Do not save data to a database yet.

Future backend option:

- Add a Next.js API route or server action.
- Store leads in Supabase.
- Add spam protection if needed.

## Deployment

Use Vercel for deployment when ready.

Important:

- Do not touch production without explicit approval.
- Work in a branch or safe development environment.

# DATA_MODEL_SKETCH

No database is needed for the initial V1.

However, if lead storage is added later, the likely data concept is `Lead`.

## Future Table: `leads`

Possible fields:

- `id` — unique lead ID
- `full_name` — lead’s full name
- `email` — lead’s email address, nullable
- `phone` — lead’s phone number, nullable
- `interest_type` — buying, selling, both, not_sure
- `message` — optional free-text message
- `source` — optional lead source, such as landing_page, ad_campaign, email, sms
- `status` — new, contacted, qualified, closed, archived
- `created_at` — timestamp when submitted
- `updated_at` — timestamp when last updated

## Validation Concept

For future backend validation:

- `full_name` should be required.
- At least one of `email` or `phone` should be required.
- `interest_type` should default to `not_sure` if not provided.
- `message` should be optional.

# AI_BUILD_RULES

- Claude must read the full project packet before coding.
- Claude must build only the current feature.
- Claude should not build future roadmap items early.
- Claude must list files it wants to edit before editing.
- ChatGPT makes the final decision.
- Claude and Gemini are advisory only.
- If the same issue fails 3 times, stop and alert Alon.
- Do not touch production.
- Do not expand scope without approval.
- Keep the product simple.
- Avoid adding authentication, dashboards, CRM features, or database storage unless explicitly approved.
- Prefer small, testable changes.
- After each feature, Claude should summarize what changed and how to test it.

# FEATURES

```json
[
  {
    "id": "FEATURE_001",
    "name": "Basic landing page structure",
    "goal": "Create the first public real estate lead follow-up landing page with a professional headline, short explanation, and clear call-to-action area.",
    "done_when": [
      "Homepage loads at the root route",
      "Page includes a clear real estate follow-up headline",
      "Page includes short supporting copy explaining why the visitor should respond",
      "Page includes a visible call-to-action section",
      "Layout is clean and readable on desktop"
    ],
    "do_not_do": [
      "Do not build the lead form yet",
      "Do not add database storage",
      "Do not add login or user accounts",
      "Do not add multiple pages",
      "Do not integrate third-party services"
    ],
    "status": "pending"
  },
  {
    "id": "FEATURE_002",
    "name": "Lead capture form UI",
    "goal": "Add a simple lead form to collect basic contact information from interested real estate leads.",
    "done_when": [
      "Form appears on the landing page",
      "Form includes full name field",
      "Form includes email field",
      "Form includes phone number field",
      "Form includes interest type selection with buying, selling, both, and not sure options",
      "Form includes optional message field",
      "Form includes a clear submit button"
    ],
    "do_not_do": [
      "Do not implement database saving",
      "Do not implement email sending",
      "Do not add advanced validation yet",
      "Do not add CRM features",
      "Do not add admin views"
    ],
    "status": "pending"
  },
  {
    "id": "FEATURE_003",
    "name": "Form validation and success message",
    "goal": "Make the lead form usable by validating required fields and showing a clear confirmation after submission.",
    "done_when": [
      "Full name is required",
      "At least one contact method, email or phone, is required",
      "User sees a helpful error message when required information is missing",
      "Successful submission shows a thank-you or confirmation message",
      "Form does not attempt to save to a database"
    ],
    "do_not_do": [
      "Do not add Supabase",
      "Do not send emails",
      "Do not add server-side submission logic unless approved",
      "Do not create a lead dashboard",
      "Do not add analytics tracking"
    ],
    "status": "pending"
  },
  {
    "id": "FEATURE_004",
    "name": "Mobile responsiveness and visual polish",
    "goal": "Improve the page so it looks professional and works well on mobile and desktop.",
    "done_when": [
      "Landing page is readable and usable on mobile screens",
      "Form fields are easy to tap on mobile",
      "CTA button is visually prominent",
      "Spacing and typography are polished",
      "Page has a trustworthy real estate landing page feel"
    ],
    "do_not_do": [
      "Do not redesign into a multi-page site",
      "Do not add animations unless very minimal",
      "Do not add heavy UI libraries",
      "Do not add unrelated sections",
      "Do not change the core V1 purpose"
    ],
    "status": "pending"
  },
  {
    "id": "FEATURE_005",
    "name": "Future lead storage preparation",
    "goal": "Prepare the code structure for possible future lead storage without actually adding a database integration.",
    "done_when": [
      "Form submission logic is organized so a backend can be added later",
      "Future lead fields are easy to map to a database",
      "No Supabase credentials or production services are added",
      "Code remains simple and understandable"
    ],
    "do_not_do": [
      "Do not install or configure Supabase yet",
      "Do not create database tables",
      "Do not add API routes unless explicitly approved",
      "Do not add authentication",
      "Do not build a CRM or admin dashboard"
    ],
    "status": "pending"
  }
]
```
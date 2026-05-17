You are Claude Code running on the EC2 AI builder.

Task: Connect the active project's lead form to Supabase.

Rules:
- Work only inside this project.
- Do not expose secrets.
- Use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from .env.local.
- Do not use service role key in frontend code.
- Insert valid lead form submissions into public.leads.
- Use existing leads table columns:
  full_name, email, phone, interest_type, message, source
- Preserve existing client-side validation.
- On successful insert, show the existing success state.
- On failed insert, show a clear non-technical error message.
- Install @supabase/supabase-js if missing.
- Create a small Supabase client helper if useful.
- Run npm run build.
- Write a short report to .ai-build/last_build_report.md.
- Do not add authentication.
- Do not add admin dashboard.
- Do not add new tables.
-- Create leads table for active project.
-- Safe V1 migration: creates table and insert policy only.
-- Does not drop or delete any data.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  interest_type text not null check (interest_type in ('buying', 'selling', 'both', 'not_sure')),
  message text,
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "Allow public lead inserts" on public.leads;

create policy "Allow public lead inserts"
on public.leads
for insert
to anon
with check (true);

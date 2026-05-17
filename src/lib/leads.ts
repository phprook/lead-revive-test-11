// Domain model and submission boundary for real-estate leads.
//
// The fields on `Lead` are intentionally chosen to map 1:1 to a future
// database row (e.g. a `leads` table in Supabase / Postgres). When a
// backend is added, only `submitLead` below should need to change.

export type LeadInterest = "buying" | "selling" | "both" | "not-sure";

export const LEAD_INTEREST_OPTIONS: ReadonlyArray<{
  value: LeadInterest;
  label: string;
}> = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not sure" },
];

export type Lead = {
  fullName: string;
  email: string | null;
  phone: string | null;
  interest: LeadInterest;
  message: string | null;
  submittedAt: string;
};

export type LeadFormInput = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export type LeadFieldErrors = {
  fullName?: string;
  contact?: string;
};

export function validateLeadInput(input: LeadFormInput): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  if (!input.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }
  if (!input.email.trim() && !input.phone.trim()) {
    errors.contact =
      "Please provide an email or phone number so we can reach you.";
  }
  return errors;
}

const INTEREST_VALUES = new Set<string>(
  LEAD_INTEREST_OPTIONS.map((option) => option.value),
);

function normalizeInterest(value: string): LeadInterest {
  return INTEREST_VALUES.has(value) ? (value as LeadInterest) : "not-sure";
}

export function buildLead(input: LeadFormInput): Lead {
  return {
    fullName: input.fullName.trim(),
    email: input.email.trim() || null,
    phone: input.phone.trim() || null,
    interest: normalizeInterest(input.interest),
    message: input.message.trim() || null,
    submittedAt: new Date().toISOString(),
  };
}

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string };

// Single boundary where a real backend would be plugged in (API route,
// Supabase client, CRM webhook, etc.). Kept as a no-op for now so the
// rest of the app already speaks the future contract.
export async function submitLead(lead: Lead): Promise<SubmitLeadResult> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[lead-revive] captured lead", lead);
  }
  return { ok: true };
}

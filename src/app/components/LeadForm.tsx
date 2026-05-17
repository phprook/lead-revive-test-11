"use client";

import { useState, type FormEvent } from "react";
import {
  LEAD_INTEREST_OPTIONS,
  buildLead,
  submitLead,
  validateLeadInput,
  type LeadFieldErrors,
  type LeadFormInput,
} from "@/lib/leads";

export default function LeadForm() {
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const input: LeadFormInput = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const nextErrors = validateLeadInput(input);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    const result = await submitLead(buildLead(input));

    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.5 7.5a1 1 0 0 1-1.408 0l-3.5-3.5a1 1 0 1 1 1.408-1.408L8.5 12.092l6.796-6.796a1 1 0 0 1 1.408 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900 sm:text-2xl dark:text-zinc-50">
          Thanks — we&apos;ll be in touch!
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base dark:text-zinc-400">
          We received your details and a member of our team will reach out
          shortly.
        </p>
      </div>
    );
  }

  const inputBase =
    "h-12 w-full rounded-lg border bg-white px-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";
  const inputDefault = "border-slate-300 dark:border-zinc-700";
  const inputError =
    "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400 dark:focus:ring-red-400/20";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-zinc-50">
        Get in touch
      </h2>
      <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-zinc-400">
        Tell us a bit about you and we&apos;ll reach out shortly.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-slate-800 dark:text-zinc-200"
          >
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            inputMode="text"
            placeholder="Jane Doe"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`${inputBase} ${errors.fullName ? inputError : inputDefault}`}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-800 dark:text-zinc-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@example.com"
            aria-invalid={errors.contact ? true : undefined}
            className={`${inputBase} ${errors.contact ? inputError : inputDefault}`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-slate-800 dark:text-zinc-200"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 555-5555"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? "contact-error" : undefined}
            className={`${inputBase} ${errors.contact ? inputError : inputDefault}`}
          />
          {errors.contact && (
            <p
              id="contact-error"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.contact}
            </p>
          )}
          {!errors.contact && (
            <p className="text-xs text-slate-500 dark:text-zinc-500">
              Email or phone — whichever you prefer.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="interest"
            className="text-sm font-medium text-slate-800 dark:text-zinc-200"
          >
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue="buying"
            className={`${inputBase} ${inputDefault} appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%2364748b' stroke-width='1.75'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
            }}
          >
            {LEAD_INTEREST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-slate-800 dark:text-zinc-200"
          >
            Message{" "}
            <span className="font-normal text-slate-500 dark:text-zinc-500">
              (optional)
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Anything we should know?"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          />
        </div>

        {submitError && (
          <p
            role="alert"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm shadow-blue-600/30 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-500 dark:shadow-blue-500/20 dark:hover:bg-blue-400 dark:focus-visible:outline-blue-400"
        >
          {submitting ? "Sending…" : "Request a callback"}
        </button>
      </div>
    </form>
  );
}

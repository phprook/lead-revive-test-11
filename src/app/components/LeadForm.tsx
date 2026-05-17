"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = {
  fullName?: string;
  contact?: string;
};

export default function LeadForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!fullName) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!email && !phone) {
      nextErrors.contact =
        "Please provide an email or phone number so we can reach you.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Thanks — we&apos;ll be in touch!
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          We received your details and a member of our team will reach out
          shortly.
        </p>
      </div>
    );
  }

  const inputBase =
    "h-11 rounded-lg border bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-300";
  const inputDefault = "border-zinc-300 dark:border-zinc-700";
  const inputError = "border-red-500 dark:border-red-500";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Get in touch
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Tell us a bit about you and we&apos;ll reach out shortly.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
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
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            aria-invalid={errors.contact ? true : undefined}
            className={`${inputBase} ${errors.contact ? inputError : inputDefault}`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
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
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="interest"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue="buying"
            className={`${inputBase} ${inputDefault}`}
          >
            <option value="buying">Buying</option>
            <option value="selling">Selling</option>
            <option value="both">Both</option>
            <option value="not-sure">Not sure</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Message{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Anything we should know?"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-300"
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Request a callback
        </button>
      </div>
    </form>
  );
}

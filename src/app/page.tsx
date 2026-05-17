import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-slate-50 to-white font-sans dark:from-zinc-950 dark:to-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-10 px-5 pt-14 pb-16 sm:gap-14 sm:px-6 sm:pt-24 sm:pb-24">
        <section className="flex flex-col items-center gap-4 text-center sm:gap-5">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Real estate follow-up
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1] dark:text-zinc-50">
            Still thinking about your next move?
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-zinc-400">
            Whether you&apos;re buying, selling, or just exploring the market,
            we&apos;ll send you a quick, no-pressure update tailored to your
            goals. Share a few details and we&apos;ll be in touch.
          </p>
        </section>

        <LeadForm />

        <p className="max-w-md text-center text-xs leading-5 text-slate-500 dark:text-zinc-500">
          Your information stays private. We&apos;ll only use it to reach out
          about your real estate questions — no spam, ever.
        </p>
      </main>
    </div>
  );
}

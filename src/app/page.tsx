import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center gap-12 px-6 py-20 sm:py-28">
        <section className="flex flex-col items-center gap-5 text-center">
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Real estate follow-up
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Still thinking about your next move?
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Whether you&apos;re buying, selling, or just exploring the market,
            we&apos;ll send you a quick, no-pressure update tailored to your goals.
            Share a few details and we&apos;ll be in touch.
          </p>
        </section>

        <LeadForm />
      </main>
    </div>
  );
}

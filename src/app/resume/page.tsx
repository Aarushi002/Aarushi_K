import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-base px-4 pb-10 pt-28 md:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Resume
          </h1>
          <Link
            href="/resume.pdf"
            download
            className="focus-orbit inline-flex items-center rounded-md border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent-cyan hover:bg-accent-cyan/10"
          >
            Download Resume
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
          <iframe
            src="/resume.pdf"
            title="Aarushi Krishna Resume"
            className="h-[80vh] w-full"
          />
        </div>
      </section>
    </main>
  );
}

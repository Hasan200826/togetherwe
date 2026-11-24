import Link from "next/link"
import { ArrowLeft, CalendarDays, Leaf, Sparkles } from "lucide-react"

export function AddEventHeroSection() {
  return (
    <section
      aria-labelledby="create-event-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#083f20_0%,#0c5126_45%,#16803d_100%)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-20 size-72 rounded-full bg-brand-bright/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-10 hidden rotate-12 text-white/10 lg:block"
      >
        <Leaf className="size-28" strokeWidth={1} />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:py-14">
        <div className="max-w-2xl">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Back to upcoming events
          </Link>

          <div className="relative mt-4 w-fit">
            <Sparkles
              aria-hidden="true"
              className="absolute -top-4 -right-6 size-5 text-brand-bright/80 sm:-right-8 sm:size-6"
            />
            <h1
              id="create-event-title"
              className="font-heading text-[2.1rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              Create a <span className="text-[#a7edb0]">New Event</span>
            </h1>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Bring your community together for a cause you care about. Fill in
            the details, preview your event, and publish it in minutes.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm sm:flex">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <CalendarDays
              aria-hidden="true"
              className="size-5 text-[#a7edb0]"
            />
          </span>
          <div>
            <p className="text-[0.7rem] text-white/60">Making a difference</p>
            <p className="text-sm font-semibold">One event at a time</p>
          </div>
        </div>
      </div>
    </section>
  )
}

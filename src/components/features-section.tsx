import { Handshake, Leaf, UsersRound } from "lucide-react"

const FEATURES = [
  {
    icon: UsersRound,
    title: "Community Events",
    description: "Join meaningful events and connect with like-minded people.",
  },
  {
    icon: Leaf,
    title: "Social Impact",
    description: "Contribute to a greener, healthier and happier community.",
  },
  {
    icon: Handshake,
    title: "Be a Volunteer",
    description: "Share your time and skills to help others.",
  },
] as const

function Sprout({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path
        d="M20 34C9.5 32.2 5.2 23.6 6.4 13.4c9.6 2.6 14 10.5 13.6 20.6Z"
        className="fill-brand"
      />
      <path
        d="M20 34c10.5-1.8 14.8-10.4 13.6-20.6-9.6 2.6-14 10.5-13.6 20.6Z"
        className="fill-brand-bright"
      />
      <path
        d="M20 35V16.5"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-brand-strong"
      />
      <circle cx="20" cy="7.5" r="4.2" className="fill-brand-strong" />
    </svg>
  )
}

export function FeaturesSection() {
  return (
    <section aria-labelledby="features-title" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-14 sm:px-8 sm:pt-12 lg:pt-14 lg:pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <div aria-hidden="true" className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-brand/25 sm:w-14" />
            <Sprout className="size-7 shrink-0" />
            <span className="h-px w-9 bg-brand/25 sm:w-14" />
          </div>

          <h2
            id="features-title"
            className="mt-2.5 font-heading text-[1.65rem] leading-tight font-bold tracking-tight text-brand-strong sm:text-3xl"
          >
            Our Features
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Everything you need to make a difference
          </p>
        </div>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex items-center gap-4 rounded-xl border border-brand/10 bg-brand-soft/60 p-5 sm:last:col-span-2 lg:gap-5 lg:p-6 lg:last:col-span-1"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#dcefd6] text-brand-strong lg:size-14">
                <Icon className="size-6 lg:size-7" strokeWidth={2.25} />
              </span>

              <div className="min-w-0">
                <h3 className="font-heading text-[0.95rem] font-semibold text-brand-strong lg:text-base">
                  {title}
                </h3>
                <p className="mt-1 max-w-[15rem] text-[0.8rem] leading-relaxed text-zinc-600 lg:text-sm">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

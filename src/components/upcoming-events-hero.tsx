import Image from "next/image"

import { Card } from "@/components/ui/card"
import upcomingEventsImage from "@/Images/image.png"

function Sparkles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 34" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5.5 29.5C10.5 20 14 14.5 17 8"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M20.5 25.5C24 18.5 26.5 14 28.5 9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M33 21.5C35 17 36.5 13.5 38 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function UpcomingEventsHero() {
  return (
    <section aria-labelledby="upcoming-events-title" className="bg-white">
      <div className="mx-auto w-full max-w-7xl">
        <Card className="relative isolate gap-0 overflow-hidden bg-[#fbfaf7] py-0 shadow-sm ring-1 ring-brand/10">
          {/* Photo */}
          <div className="relative h-48 w-full sm:h-56 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[64%]">
            <Image
              src={upcomingEventsImage}
              alt="Hands holding a young sapling growing in rich soil"
              fill
              preload
              sizes="(min-width: 1280px) 778px, (min-width: 1024px) 64vw, 100vw"
              className="object-cover object-[62%_45%] lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfaf7] via-[#fbfaf7]/10 to-transparent lg:hidden" />
          </div>

          {/* Desktop wash so the copy stays legible over the photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 hidden bg-[linear-gradient(90deg,#fbfaf7_0%,#fbfaf7_28%,rgba(251,250,247,0.97)_38%,rgba(251,250,247,0.86)_47%,rgba(251,250,247,0.45)_60%,rgba(251,250,247,0.08)_72%,rgba(251,250,247,0)_82%)] lg:block"
          />

          {/* Copy */}
          <div className="relative z-10 px-6 pt-7 pb-9 sm:px-10 sm:pt-8 sm:pb-10 lg:flex lg:min-h-80 lg:items-center lg:px-16 lg:py-12 xl:px-20">
            <div className="max-w-[27rem]">
              <div className="relative w-fit">
                <Sparkles className="absolute -top-3 -right-8 size-6 text-brand sm:-top-6 sm:-right-11 sm:size-8 lg:-top-7 lg:-right-14 lg:size-10" />
                <h1
                  id="upcoming-events-title"
                  className="font-heading text-[2.6rem] leading-[0.96] font-extrabold tracking-[-0.03em] text-brand-strong sm:text-[3.4rem] lg:text-[4rem] lg:leading-[0.94]"
                >
                  Upcoming
                  <br />
                  Events
                </h1>
              </div>

              <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed font-medium text-zinc-700 sm:mt-5 sm:text-base lg:mt-5 lg:text-lg">
                Be a part of our upcoming events and{" "}
                <br className="hidden sm:block" />
                make a difference together.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

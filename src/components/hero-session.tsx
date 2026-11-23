import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, Heart } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import bannerImage from "@/Images/benner.jpg"

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 34"
      fill="none"
      aria-hidden="true"
      className={cn("text-brand", className)}
    >
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

export function HeroSession() {
  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-none bg-white ring-1 ring-brand/5">
          {/* Banner photo */}
          <div className="relative h-60 w-full sm:h-80 lg:absolute lg:inset-0 lg:h-full">
            <Image
              src={bannerImage}
              alt="Volunteers in green shirts planting a sapling together in a sunlit park"
              fill
              preload
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-[62%_30%] lg:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent lg:hidden" />
          </div>

          {/* Desktop white wash so copy stays legible over the photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_28%,rgba(255,255,255,0.97)_40%,rgba(255,255,255,0.78)_55%,rgba(255,255,255,0.32)_70%,rgba(255,255,255,0)_86%)] lg:block"
          />

          {/* Copy */}
          <div className="relative z-10 px-6 pt-1 pb-10 sm:px-10 sm:pb-12 lg:flex lg:min-h-[26rem] lg:items-center lg:px-16 lg:py-16">
            <div className="max-w-[34rem]">
              <div className="relative w-fit max-w-full">
                <Sparkles className="absolute -top-4 -right-5 hidden size-7 sm:block lg:-top-6 lg:-right-9 lg:size-9" />
                <h1
                  id="hero-title"
                  className="font-heading text-[2.3rem] leading-[1.06] font-extrabold tracking-[-0.025em] text-brand-strong sm:text-5xl lg:text-[3.35rem]"
                >
                  Together for a
                  <br className="hidden sm:block" /> Better Tomorrow
                </h1>
              </div>

              <p className="mt-4 max-w-[25rem] text-[0.95rem] leading-relaxed text-zinc-700 sm:text-base lg:mt-5 lg:text-[1.05rem]">
                Join our community and be a part of positive change. Together, we
                can build a cleaner, greener and kinder world.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
                <Link
                  href="/upcoming-events"
                  className={cn(
                    buttonVariants({ variant: "brand", size: "pill" }),
                    "h-11 px-5 text-[0.95rem] lg:h-12 lg:px-6"
                  )}
                >
                  <CalendarDays className="size-[18px]" strokeWidth={2.25} />
                  Explore Events
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                </Link>

                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "brand-outline", size: "pill" }),
                    "h-11 bg-white/85 px-5 text-[0.95rem] hover:bg-white lg:h-12 lg:px-6"
                  )}
                >
                  <Heart className="size-[18px] fill-current" strokeWidth={2.25} />
                  Our Mission
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px z-20 hidden h-24 w-full lg:block"
          >
            <defs>
              <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d9efd3" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#e8f5e4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 92c180-48 340-22 560 4s400 20 570-16c120-26 220-28 310-20v80H0Z"
              fill="url(#hero-wave-fill)"
            />
            <path d="M0 120c210-22 372 0 566 8v12H0Z" fill="#ffffff" fillOpacity="0.85" />
          </svg>
        </div>
      </div>
    </section>
  )
}

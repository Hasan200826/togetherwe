import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Compass, Leaf } from "lucide-react"

import { BrandMark } from "@/components/brand-logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Page Not Found | TogetherWe",
  description:
    "The page you are looking for does not exist or may have moved elsewhere.",
}

export default function NotFound() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-[#f4f9ef]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 size-[30rem] rounded-full bg-[#e3f2dc] blur-3xl"
      />
      <Leaf
        aria-hidden="true"
        strokeWidth={0.7}
        className="pointer-events-none absolute -top-16 -right-14 size-72 rotate-12 text-brand/10 sm:size-80"
      />
      <Leaf
        aria-hidden="true"
        strokeWidth={0.7}
        className="pointer-events-none absolute -bottom-20 -left-16 size-80 -rotate-12 text-brand/10 sm:size-96"
      />

      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="relative w-full rounded-3xl border border-white/80 bg-white px-6 py-12 shadow-[0_30px_80px_-40px_rgba(12,81,38,0.45)] sm:px-12 sm:py-14">
          <BrandMark className="mx-auto size-14" />

          <p
            aria-hidden="true"
            className="mt-6 font-heading text-7xl leading-none font-extrabold tracking-tight text-brand/20 sm:text-8xl"
          >
            404
          </p>

          <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl">
            Page not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base">
            We couldn&apos;t find the page you were looking for. It may have been
            moved, renamed, or never existed at all.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "brand", size: "pill" }),
                "w-full sm:w-auto"
              )}
            >
              <ArrowLeft aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/upcoming-events"
              className={cn(
                buttonVariants({ variant: "brand-outline", size: "pill" }),
                "w-full sm:w-auto"
              )}
            >
              <Compass aria-hidden="true" />
              Browse events
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

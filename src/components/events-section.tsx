import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { EventCard } from "@/components/event-card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
export const instant =false

export async function EventsSection() {
  const res =await fetch('http://localhost:8000/upcoming-events');
  const EVENTS =await res.json();
  return (
    <section aria-labelledby="events-title" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-4 pb-14 sm:px-8 sm:pt-6 sm:pb-16 lg:pb-20">
        <div className="relative">
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            <span aria-hidden="true" className="hidden h-px flex-1 bg-brand/20 sm:block" />
            <h2
              id="events-title"
              className="shrink-0 text-center font-heading text-2xl font-bold tracking-tight text-brand-strong sm:text-[1.75rem] lg:text-3xl"
            >
              Recent Upcoming Events
            </h2>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-brand/20 sm:block" />
          </div>

          <p className="mt-2 text-center text-sm text-zinc-500 sm:text-base">
            Don&apos;t miss out on these amazing community events
          </p>

          <div className="mt-4 flex justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-0">
            <Link
              href="/upcoming-events"
              className={cn(
                buttonVariants({ variant: "brand", size: "pill" }),
                "h-10 px-5 text-[0.9rem]"
              )}
            >
              View All Events
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3">
          {EVENTS.slice(EVENTS.length-3,EVENTS.length).reverse().map((event) => (
            <EventCard
              key={event.title}
              event={event}
              className="sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-0.625rem)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

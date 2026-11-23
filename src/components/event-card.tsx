import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type EventCardProps = {
  image: StaticImageData
  category: string
  title: string
  location: string
  date: string
  href: string
  imageClassName?: string
  className?: string
}

export function EventCard({
  image,
  category,
  title,
  location,
  date,
  href,
  imageClassName,
  className,
}: EventCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_26px_-18px_rgba(12,81,38,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(12,81,38,0.35)] focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 392px, (min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-[1.04]",
            imageClassName
          )}
        />
        <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-[0.7rem] leading-none font-semibold text-white shadow-sm">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="truncate font-heading text-[1.02rem] font-bold text-brand-strong sm:text-[1.08rem]">
          {title}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0 space-y-1.5 text-xs text-zinc-600">
            <p className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />
              <span>{date}</span>
            </p>
          </div>

          <span
            aria-hidden="true"
            className={cn(
              buttonVariants({ variant: "brand", size: "sm" }),
              "h-8 shrink-0 rounded-full px-3.5 text-xs"
            )}
          >
            View Event
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Broom,
  CalendarDays,
  Gift,
  Leaf,
  MapPin,
  Sprout,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type EventCategory =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Health"
  | "Environment"
  | "Social"

export type UpcomingEvent = {
  slug: string
  title: string
  category: EventCategory
  description: string
  date: string
  location: string
  image: StaticImageData
  imageAlt: string
  imageClassName?: string
}

const CATEGORY_STYLES: Record<
  EventCategory,
  { icon: LucideIcon; className: string }
> = {
  Cleanup: {
    icon: Broom,
    className: "bg-brand-soft text-brand-strong",
  },
  Plantation: {
    icon: Sprout,
    className: "bg-brand-soft text-brand-strong",
  },
  Donation: {
    icon: Gift,
    className: "bg-orange-50 text-orange-600",
  },
  Health: {
    icon: Stethoscope,
    className: "bg-sky-50 text-sky-600",
  },
  Environment: {
    icon: Leaf,
    className: "bg-brand-soft text-brand-strong",
  },
  Social: {
    icon: UsersRound,
    className: "bg-violet-50 text-violet-600",
  },
}

export function EventCategoryBadge({
  category,
  className,
}: {
  category: EventCategory
  className?: string
}) {
  const { icon: Icon, className: categoryClassName } = CATEGORY_STYLES[category]

  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-6 gap-1 rounded-full border-0 px-2.5 text-[0.68rem] font-semibold",
        categoryClassName,
        className
      )}
    >
      <Icon aria-hidden="true" />
      {category}
    </Badge>
  )
}

type UpcomingEventCardProps = {
  event: UpcomingEvent
  onViewDetails?: (event: UpcomingEvent) => void
  className?: string
}

export function UpcomingEventCard({
  event,
  onViewDetails,
  className,
}: UpcomingEventCardProps) {
  return (
    <Card
      className={cn(
        "group h-full flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_26px_-20px_rgba(12,81,38,0.28)] ring-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_36px_-24px_rgba(12,81,38,0.38)] sm:flex-row",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[10.5rem] sm:w-[42%]">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1280px) 251px, (min-width: 1024px) 220px, (min-width: 640px) 42vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-[1.04]",
            event.imageClassName
          )}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-1.5 pb-1.5 sm:py-1 sm:pr-2">
        <EventCategoryBadge category={event.category} />

        <h3 className="mt-2 font-heading text-[1.02rem] leading-tight font-bold text-brand-strong">
          {event.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-zinc-600">
          {event.description}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-2 pt-3">
          <div className="space-y-1 text-[0.72rem] text-zinc-500">
            <p className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />
              <span>{event.date}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{event.location}</span>
            </p>
          </div>

          {onViewDetails ? (
            <Button
              type="button"
              variant="brand"
              size="sm"
              onClick={() => onViewDetails(event)}
              className="h-8 shrink-0 rounded-full px-3 text-xs"
            >
              View Details
              <ArrowRight className="size-3.5" />
            </Button>
          ) : (
            <Link
              href="/upcoming-events"
              className={cn(
                buttonVariants({ variant: "brand", size: "sm" }),
                "h-8 shrink-0 rounded-full px-3 text-xs"
              )}
            >
              View Details
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

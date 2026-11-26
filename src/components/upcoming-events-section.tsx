"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  Broom,
  CalendarDays,
  Gift,
  MapPin,
  RotateCcw,
  Sprout,
  Tag,
  type LucideIcon,
} from "lucide-react"

import {
  EventCategoryBadge,
  UpcomingEventCard,
  type EventCategory,
  type UpcomingEvent,
} from "@/components/upcoming-event-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import bannerImage from "@/Images/benner.jpg"
import donationImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (1).jpg"
import educationImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (2).jpg"
import cleanupImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (3).jpg"
import saplingImage from "@/Images/image.png"

type FilterValue = "all" | "Cleanup" | "Plantation" | "Donation" | "Others"

const FILTERS: {
  label: string
  value: FilterValue
  icon?: LucideIcon
}[] = [
  { label: "All Events", value: "all" },
  { label: "Cleanup", value: "Cleanup", icon: Broom },
  { label: "Plantation", value: "Plantation", icon: Sprout },
  { label: "Donation", value: "Donation", icon: Gift },
  { label: "Others", value: "Others", icon: Tag },
]

const OTHERS: EventCategory[] = [
  "Health",
  "Environment",
  "Social",
  "Others",
]
const PAGE_SIZE = 6

const KNOWN_CATEGORIES: EventCategory[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Health",
  "Environment",
  "Social",
  "Others",
]

const EVENTS_ENDPOINT = "http://localhost:8000/upcoming-events"

const FALLBACK_IMAGES = [
  cleanupImage,
  saplingImage,
  donationImage,
  educationImage,
  bannerImage,
]

// const UPCOMING_EVENTS: UpcomingEvent[] = [
//   {
//     slug: "beach-cleanup-drive",
//     title: "Beach Cleanup Drive",
//     category: "Cleanup",
//     description:
//       "Let's keep our beaches clean and beautiful for future generations.",
//     date: "Nov 30, 2026",
//     location: "Cox's Bazar",
//     image: cleanupImage,
//     imageAlt: "Volunteers collecting waste along a riverside cleanup drive",
//   },
//   {
//     slug: "tree-plantation-program",
//     title: "Tree Plantation Program",
//     category: "Plantation",
//     description: "Plant more trees, build a greener and healthier planet.",
//     date: "Dec 05, 2026",
//     location: "Savar, Dhaka",
//     image: saplingImage,
//     imageAlt: "Hands holding a young sapling growing in rich soil",
//   },
//   {
//     slug: "winter-clothes-donation",
//     title: "Winter Clothes Donation",
//     category: "Donation",
//     description: "Share your warmth with those in need this winter.",
//     date: "Dec 10, 2026",
//     location: "Dhaka",
//     image: donationImage,
//     imageAlt: "Volunteers handing blankets and food to community members",
//     imageClassName: "object-[70%_45%]",
//   },
//   {
//     slug: "free-health-camp",
//     title: "Free Health Camp",
//     category: "Health",
//     description: "Get free health checkup and medical support.",
//     date: "Dec 15, 2026",
//     location: "Dhaka",
//     image: educationImage,
//     imageAlt: "Community volunteers spending time with children",
//     imageClassName: "object-[55%_40%]",
//   },
//   {
//     slug: "green-community-day",
//     title: "Green Community Day",
//     category: "Environment",
//     description: "Together for a greener and cleaner community.",
//     date: "Dec 20, 2026",
//     location: "Rajshahi",
//     image: bannerImage,
//     imageAlt: "Volunteers planting saplings together in a park",
//   },
//   {
//     slug: "food-distribution-drive",
//     title: "Food Distribution Drive",
//     category: "Social",
//     description: "Help the needy, spread kindness in our society.",
//     date: "Dec 25, 2026",
//     location: "Dhaka",
//     image: donationImage,
//     imageAlt: "Volunteers distributing food packages to local families",
//     imageClassName: "object-[28%_48%]",
//   },
//   {
//     slug: "riverbank-cleanup",
//     title: "Riverbank Cleanup",
//     category: "Cleanup",
//     description:
//       "Restore our riverbanks and protect the wildlife that calls them home.",
//     date: "Jan 05, 2027",
//     location: "Buriganga River, Dhaka",
//     image: cleanupImage,
//     imageAlt: "Volunteers cleaning up a riverbank",
//     imageClassName: "object-[35%_55%]",
//   },
//   {
//     slug: "community-tree-fair",
//     title: "Community Tree Fair",
//     category: "Plantation",
//     description:
//       "Celebrate greener neighbourhoods with a day of planting and learning.",
//     date: "Jan 10, 2027",
//     location: "Dhanmondi, Dhaka",
//     image: saplingImage,
//     imageAlt: "A young tree being planted in rich soil",
//     imageClassName: "object-[75%_45%]",
//   },
//   {
//     slug: "blanket-distribution",
//     title: "Blanket Distribution",
//     category: "Donation",
//     description:
//       "Help families stay warm through the coldest months of the year.",
//     date: "Jan 12, 2027",
//     location: "Sylhet",
//     image: donationImage,
//     imageAlt: "Volunteers handing winter blankets to families",
//     imageClassName: "object-[80%_55%]",
//   },
//   {
//     slug: "eye-care-camp",
//     title: "Eye Care Camp",
//     category: "Health",
//     description:
//       "Free eye screenings and glasses for community members in need.",
//     date: "Jan 18, 2027",
//     location: "Chattogram",
//     image: educationImage,
//     imageAlt: "Community members gathered for a local support programme",
//     imageClassName: "object-[45%_40%]",
//   },
//   {
//     slug: "zero-waste-workshop",
//     title: "Zero Waste Workshop",
//     category: "Environment",
//     description: "Learn simple, practical ways to reduce waste at home.",
//     date: "Jan 22, 2027",
//     location: "Khulna",
//     image: cleanupImage,
//     imageAlt: "Volunteers working together outdoors",
//     imageClassName: "object-[60%_40%]",
//   },
//   {
//     slug: "community-iftar",
//     title: "Community Iftar",
//     category: "Social",
//     description:
//       "Share a meal and strengthen the bonds that make us a community.",
//     date: "Jan 28, 2027",
//     location: "Old Dhaka",
//     image: donationImage,
//     imageAlt: "Volunteers sharing food with community members",
//     imageClassName: "object-[45%_60%]",
//   },
//   {
//     slug: "coastal-cleanup-day",
//     title: "Coastal Cleanup Day",
//     category: "Cleanup",
//     description:
//       "Join volunteers protecting our coastline for people and wildlife.",
//     date: "Feb 02, 2027",
//     location: "Kuakata",
//     image: cleanupImage,
//     imageAlt: "Volunteers cleaning up a coastal area",
//     imageClassName: "object-[20%_50%]",
//   },
//   {
//     slug: "mangrove-plantation",
//     title: "Mangrove Plantation",
//     category: "Plantation",
//     description:
//       "Plant mangroves to protect coastal communities for years to come.",
//     date: "Feb 08, 2027",
//     location: "Sundarbans",
//     image: saplingImage,
//     imageAlt: "Hands planting a young mangrove sapling",
//     imageClassName: "object-[40%_55%]",
//   },
//   {
//     slug: "school-supplies-drive",
//     title: "School Supplies Drive",
//     category: "Donation",
//     description: "Give students the tools they need to learn and thrive.",
//     date: "Feb 12, 2027",
//     location: "Barishal",
//     image: donationImage,
//     imageAlt: "Volunteers preparing supplies for local families",
//     imageClassName: "object-[15%_45%]",
//   },
//   {
//     slug: "blood-donation-camp",
//     title: "Blood Donation Camp",
//     category: "Health",
//     description: "Donate blood and help save lives across our community.",
//     date: "Feb 16, 2027",
//     location: "Dhaka",
//     image: educationImage,
//     imageAlt: "Volunteers supporting children at a community event",
//     imageClassName: "object-[70%_50%]",
//   },
//   {
//     slug: "solar-light-campaign",
//     title: "Solar Light Campaign",
//     category: "Environment",
//     description: "Bring clean, safe light to homes beyond the grid.",
//     date: "Feb 20, 2027",
//     location: "Rangpur",
//     image: bannerImage,
//     imageAlt: "Community volunteers working together outdoors",
//     imageClassName: "object-[35%_45%]",
//   },
//   {
//     slug: "elderly-care-visit",
//     title: "Elderly Care Visit",
//     category: "Social",
//     description: "Spend time and share kindness with older neighbours.",
//     date: "Feb 26, 2027",
//     location: "Dhaka",
//     image: educationImage,
//     imageAlt: "Community members sharing a moment together",
//     imageClassName: "object-[25%_45%]",
//   },
// ]

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function normalizeCategory(value: unknown): EventCategory {
  const category = asTrimmedString(value)
  const isKnown = (KNOWN_CATEGORIES as string[]).includes(category)

  return isKnown ? (category as EventCategory) : "Others"
}

function formatDate(value: unknown): string {
  const raw = asTrimmedString(value)
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw)

  if (!match) {
    return raw
  }

  const [, year, month, day] = match
  const parsed = new Date(Number(year), Number(month) - 1, Number(day))

  if (Number.isNaN(parsed.getTime())) {
    return raw
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function normalizeEvent(raw: unknown, index: number): UpcomingEvent | null {
  if (typeof raw !== "object" || raw === null) {
    return null
  }

  const record = raw as Record<string, unknown>
  const title = asTrimmedString(record.title)

  if (!title) {
    return null
  }

  const image = asTrimmedString(record.image)

  return {
    slug:
      asTrimmedString(record.slug) ||
      asTrimmedString(record._id) ||
      `event-${index + 1}`,
    title,
    category: normalizeCategory(record.category),
    description: asTrimmedString(record.description),
    date: formatDate(record.date),
    location: asTrimmedString(record.location),
    image: image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    imageAlt: asTrimmedString(record.imageAlt) || `${title} event cover`,
    imageClassName: asTrimmedString(record.imageClassName) || undefined,
  }
}

function extractEventList(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data
  }

  if (typeof data === "object" && data !== null) {
    const record = data as Record<string, unknown>
    const nested = record.events ?? record.data ?? record.upcomingEvents

    if (Array.isArray(nested)) {
      return nested
    }
  }

  return []
}

async function fetchUpcomingEvents(
  signal?: AbortSignal
): Promise<UpcomingEvent[]> {
  const res = await fetch(EVENTS_ENDPOINT, { signal })

  if (!res.ok) {
    throw new Error(`Upcoming events request failed with status ${res.status}`)
  }

  const data: unknown = await res.json()

  return extractEventList(data)
    .map(normalizeEvent)
    .filter((event): event is UpcomingEvent => event !== null)
}

type LoadStatus = "loading" | "error" | "ready"

export  function UpcomingEventsSection() {
  const [events, setEvents] = useState<UpcomingEvent[]>([])
  const [status, setStatus] = useState<LoadStatus>("loading")
  const [reloadKey, setReloadKey] = useState(0)
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all")
  const [page, setPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchUpcomingEvents(controller.signal)
      .then((list) => {
        setEvents(list)
        setStatus("ready")
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        console.error("Failed to load upcoming events:", error)
        setStatus("error")
      })

    return () => controller.abort()
  }, [reloadKey])

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return events
    }

    if (activeFilter === "Others") {
      return events.filter((event) => OTHERS.includes(event.category))
    }

    return events.filter((event) => event.category === activeFilter)
  }, [activeFilter, events])

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visibleEvents = filteredEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function handleFilterChange(value: FilterValue) {
    setActiveFilter(value)
    setPage(1)
  }

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) {
      return
    }

    setPage(nextPage)
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="upcoming-events"
      aria-labelledby="upcoming-events-list-title"
      className="bg-white"
    >
      <h2 id="upcoming-events-list-title" className="sr-only">
        Event listings
      </h2>
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 pb-14 sm:px-8 sm:pt-8 sm:pb-16 lg:pb-20">
        <div
          role="group"
          aria-label="Filter events by category"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {FILTERS.map(({ label, value, icon: Icon }) => {
            const active = activeFilter === value

            return (
              <Button
                key={value}
                type="button"
                variant={active ? "brand" : "outline"}
                size="pill"
                aria-pressed={active}
                aria-controls="upcoming-events-grid"
                onClick={() => handleFilterChange(value)}
                className={cn(
                  "h-9 gap-1.5 px-4 text-[0.8rem]",
                  !active &&
                    "border-zinc-200 bg-white text-zinc-700 hover:border-brand/30 hover:bg-brand-soft/60 hover:text-brand-strong"
                )}
              >
                {Icon ? (
                  <Icon aria-hidden="true" className="size-3.5 text-brand" />
                ) : null}
                {label}
              </Button>
            )
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {status === "loading"
            ? "Loading upcoming events."
            : status === "error"
              ? "Upcoming events could not be loaded."
              : `Showing ${visibleEvents.length} of ${filteredEvents.length} events. Page ${currentPage} of ${totalPages}.`}
        </p>

        {status === "loading" ? (
          <div
            aria-hidden="true"
            className="mt-6 grid gap-4 sm:mt-7 sm:gap-5 lg:grid-cols-2"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-2xl bg-zinc-100 sm:h-40"
              />
            ))}
          </div>
        ) : status === "error" ? (
          <Card className="mt-7 items-center gap-1 border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm ring-0">
            <h3 className="font-heading text-lg font-bold text-brand-strong">
              Could not load events
            </h3>
            <p className="text-sm text-zinc-500">
              Something went wrong while fetching the list. Please try again.
            </p>
            <Button
              type="button"
              variant="brand"
              size="pill"
              onClick={() => {
                setStatus("loading")
                setReloadKey((key) => key + 1)
              }}
              className="mt-3 h-9 px-4 text-xs"
            >
              <RotateCcw aria-hidden="true" className="size-3.5" />
              Try again
            </Button>
          </Card>
        ) : visibleEvents.length > 0 ? (
          <div
            id="upcoming-events-grid"
            ref={gridRef}
            className="mt-6 grid scroll-mt-28 gap-4 sm:mt-7 sm:gap-5 lg:grid-cols-2"
          >
            {visibleEvents.map((event) => (
              <UpcomingEventCard
                key={event.slug}
                event={event}
                onViewDetails={setSelectedEvent}
              />
            ))}
          </div>
        ) : (
          <Card className="mt-7 items-center gap-1 border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm ring-0">
            <h3 className="font-heading text-lg font-bold text-brand-strong">
              {events.length === 0 ? "No upcoming events yet" : "No events found"}
            </h3>
            <p className="text-sm text-zinc-500">
              {events.length === 0
                ? "Check back soon, new community events are added regularly."
                : "Try another category to see more events."}
            </p>
            {events.length > 0 ? (
              <Button
                type="button"
                variant="brand"
                size="pill"
                onClick={() => handleFilterChange("all")}
                className="mt-3 h-9 px-4 text-xs"
              >
                Show all events
              </Button>
            ) : null}
          </Card>
        )}

        {status === "ready" && totalPages > 1 ? (
          <nav
            aria-label="Event pagination"
            className="mt-8 flex items-center justify-center gap-1.5"
          >
            {currentPage > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                aria-controls="upcoming-events-grid"
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-full border-zinc-200 bg-white text-zinc-600 hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong"
              >
                <ArrowLeft className="size-4" />
              </Button>
            ) : null}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => {
                const active = pageNumber === currentPage

                return (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant={active ? "brand" : "outline"}
                    size="icon-sm"
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={active ? "page" : undefined}
                    aria-controls="upcoming-events-grid"
                    onClick={() => goToPage(pageNumber)}
                    className={cn(
                      "size-8 rounded-full text-xs font-semibold",
                      !active &&
                        "border-zinc-200 bg-white text-zinc-600 hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong"
                    )}
                  >
                    {pageNumber}
                  </Button>
                )
              }
            )}

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Next page"
              aria-controls="upcoming-events-grid"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="rounded-full border-zinc-200 bg-white text-zinc-600 hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong"
            >
              <ArrowRight className="size-4" />
            </Button>
          </nav>
        ) : null}
      </div>

      <Sheet
        open={selectedEvent !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEvent(null)
          }
        }}
      >
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 bg-white p-0 sm:max-w-md"
        >
          {selectedEvent ? (
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="relative aspect-[16/9] w-full shrink-0">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.imageAlt}
                  fill
                  unoptimized={typeof selectedEvent.image === "string"}
                  sizes="(min-width: 640px) 448px, 100vw"
                  className={cn(
                    "object-cover",
                    selectedEvent.imageClassName
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <SheetHeader className="gap-3 p-0">
                  <EventCategoryBadge category={selectedEvent.category} />
                  <SheetTitle className="font-heading text-2xl leading-tight font-bold text-brand-strong">
                    {selectedEvent.title}
                  </SheetTitle>
                  <SheetDescription className="text-sm leading-relaxed text-zinc-600">
                    {selectedEvent.description}
                  </SheetDescription>
                </SheetHeader>

                <dl className="mt-5 space-y-2.5 text-sm text-zinc-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brand"
                    />
                    <dt className="sr-only">Date</dt>
                    <dd>{selectedEvent.date}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brand"
                    />
                    <dt className="sr-only">Location</dt>
                    <dd>{selectedEvent.location}</dd>
                  </div>
                </dl>

                <SheetFooter className="mt-auto gap-2 p-0 pt-8">
                  <SheetClose
                    render={
                      <Button
                        variant="brand"
                        size="pill"
                        className="w-full"
                      />
                    }
                  >
                    Close details
                  </SheetClose>
                </SheetFooter>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  )
}

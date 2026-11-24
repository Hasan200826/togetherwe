import Image from "next/image"
import {
  Broom,
  CalendarDays,
  Eye,
  Gift,
  ImagePlus,
  Leaf,
  MapPin,
  Sprout,
  Stethoscope,
  Tag,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type EventPreviewData = {
  title: string
  category: string
  description: string
  date: string
  location: string
  imageUrl: string | null
}

const CATEGORY_META: Record<
  string,
  { icon: LucideIcon; className: string }
> = {
  Cleanup: { icon: Broom, className: "bg-emerald-50 text-emerald-700" },
  Plantation: { icon: Sprout, className: "bg-lime-50 text-lime-700" },
  Donation: { icon: Gift, className: "bg-orange-50 text-orange-600" },
  Health: { icon: Stethoscope, className: "bg-sky-50 text-sky-600" },
  Environment: { icon: Leaf, className: "bg-teal-50 text-teal-700" },
  Social: { icon: UsersRound, className: "bg-violet-50 text-violet-600" },
  Others: { icon: Tag, className: "bg-slate-100 text-slate-600" },
}

function formatEventDate(value: string) {
  if (!value) {
    return ""
  }

  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function EventPreviewCard({ data }: { data: EventPreviewData }) {
  const meta = data.category ? CATEGORY_META[data.category] : undefined
  const CategoryIcon = meta?.icon ?? Tag
  const formattedDate = formatEventDate(data.date)

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_18px_40px_-28px_rgba(12,81,38,0.45)] ring-0">
      <CardHeader className="flex flex-row items-center gap-3 border-b border-zinc-100 px-5 py-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
          <Eye aria-hidden="true" className="size-4.5" />
        </span>
        <div className="min-w-0">
          <CardTitle className="font-heading text-base font-bold text-brand-strong">
            Event Preview
          </CardTitle>
          <CardDescription className="mt-0.5 text-xs">
            This is how your event will appear.
          </CardDescription>
        </div>
      </CardHeader>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[linear-gradient(135deg,#edf7ef_0%,#dcf0e1_100%)]">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt="Selected event cover preview"
            fill
            unoptimized
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 352px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-brand/60">
            <span className="grid size-12 place-items-center rounded-full bg-white/70 shadow-sm">
              <ImagePlus aria-hidden="true" className="size-5" />
            </span>
            <span className="text-xs font-semibold text-brand-strong/60">
              Your event image
            </span>
          </div>
        )}

        {data.imageUrl ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
          />
        ) : null}

        <Badge
          variant="secondary"
          className={cn(
            "absolute top-3 left-3 h-6 gap-1 rounded-full border-0 bg-white/95 px-2.5 text-[0.68rem] font-semibold shadow-sm backdrop-blur",
            meta ? meta.className : "text-zinc-500"
          )}
        >
          <CategoryIcon aria-hidden="true" />
          {data.category || "Category"}
        </Badge>
      </div>

      <CardContent className="space-y-4 px-5 py-5">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
            Event title
          </p>
          <h3
            className={cn(
              "mt-1 font-heading text-lg leading-snug font-bold transition-colors",
              data.title ? "text-brand-strong" : "text-zinc-400"
            )}
          >
            {data.title || "Your event title"}
          </h3>
        </div>

        <p
          className={cn(
            "line-clamp-3 text-sm leading-relaxed",
            data.description ? "text-zinc-600" : "text-zinc-400"
          )}
        >
          {data.description ||
            "Your event description will appear here so people know what to expect."}
        </p>

        <div className="space-y-2.5 border-t border-zinc-100 pt-4 text-sm">
          <p className="flex items-center gap-2.5">
            <CalendarDays
              aria-hidden="true"
              className="size-4 shrink-0 text-brand"
            />
            <span className={formattedDate ? "text-zinc-700" : "text-zinc-400"}>
              {formattedDate || "Date to be announced"}
            </span>
          </p>
          <p className="flex items-center gap-2.5">
            <MapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-brand"
            />
            <span
              className={cn(
                "truncate",
                data.location ? "text-zinc-700" : "text-zinc-400"
              )}
            >
              {data.location || "Location to be announced"}
            </span>
          </p>
        </div>
      </CardContent>

      <div className="border-t border-zinc-100 bg-[#f8faf6] px-5 py-3">
        <p className="flex items-center gap-2 text-[0.7rem] leading-relaxed text-zinc-500">
          <Leaf aria-hidden="true" className="size-3.5 shrink-0 text-brand" />
          Preview updates automatically as you fill in the details.
        </p>
      </div>
    </Card>
  )
}

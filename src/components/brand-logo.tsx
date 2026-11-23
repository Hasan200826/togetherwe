import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandTone = "brand" | "on-dark"

export function BrandMark({
  tone = "brand",
  className,
}: {
  tone?: BrandTone
  className?: string
}) {
  const onDark = tone === "on-dark"

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("shrink-0", className)}>
      <path
        d="M20 34C9.5 32.2 5.2 23.6 6.4 13.4c9.6 2.6 14 10.5 13.6 20.6Z"
        className={onDark ? "fill-white" : "fill-brand"}
      />
      <path
        d="M20 34c10.5-1.8 14.8-10.4 13.6-20.6-9.6 2.6-14 10.5-13.6 20.6Z"
        className="fill-brand-bright"
      />
      <path
        d="M20 35V16.5"
        strokeWidth="2.6"
        strokeLinecap="round"
        className={onDark ? "stroke-white" : "stroke-brand-strong"}
      />
      <circle cx="20" cy="7.5" r="4.2" className={onDark ? "fill-white" : "fill-brand-strong"} />
    </svg>
  )
}

export function BrandLogo({
  tone = "brand",
  showTagline = false,
  className,
}: {
  tone?: BrandTone
  showTagline?: boolean
  className?: string
}) {
  const onDark = tone === "on-dark"

  return (
    <Link
      href="/"
      aria-label="TogetherWe home"
      className={cn("flex w-fit shrink-0 items-center gap-2.5", className)}
    >
      <BrandMark tone={tone} className="size-9" />
      <span className="flex flex-col">
        <span
          className={cn(
            "text-[22px] leading-none font-bold tracking-tight",
            onDark ? "text-white" : "text-brand-strong"
          )}
        >
          Together<span className="text-brand-bright">We</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1.5 text-[0.68rem] leading-none font-medium whitespace-nowrap",
              onDark ? "text-white/60" : "text-zinc-500"
            )}
          >
            Connect People, Create Change
          </span>
        ) : null}
      </span>
    </Link>
  )
}

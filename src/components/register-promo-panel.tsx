import Image from "next/image"
import {
  CalendarCheck,
  HeartHandshake,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import registerBanner from "@/Images/register-benner.jpg"

const FEATURES: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarCheck, label: "Join Amazing Community Events" },
  { icon: HeartHandshake, label: "Contribute to Social Impact" },
  { icon: UsersRound, label: "Be a Volunteer and Make a Difference" },
]

export function RegisterPromoPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-brand-strong text-white lg:flex">
      <Image
        src={registerBanner}
        alt="TogetherWe volunteers sitting together in a park with the city skyline behind them"
        fill
        preload
        sizes="(min-width: 1280px) 470px, (min-width: 1024px) 42vw, 100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#083f20]/55 via-[#0c5126]/10 to-transparent"
      />

      <div className="relative z-10 flex w-full flex-col p-8 lg:p-10">
        <BrandLogo tone="on-dark" showTagline />

        <h2 className="mt-10 max-w-xs font-heading text-[2.15rem] leading-[1.08] font-extrabold tracking-[-0.02em] xl:text-[2.4rem]">
          Join Our <span className="text-[#a7edb0]">Community!</span>
        </h2>

        <p className="mt-3 max-w-[19rem] text-sm leading-relaxed text-white/80">
          Be a part of something bigger. Together, we can build a cleaner,
          greener and kinder world.
        </p>

        <ul className="mt-7 space-y-4">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#a7edb0] ring-1 ring-white/15 backdrop-blur-sm">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="max-w-[15rem] text-sm leading-snug font-medium text-white/90">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

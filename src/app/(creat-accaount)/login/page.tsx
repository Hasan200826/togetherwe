import type { Metadata } from "next"
import { Leaf } from "lucide-react"

import { RegisterForm } from "@/components/register-form"
import { RegisterPromoPanel } from "@/components/register-promo-panel"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Create Your Account | TogetherWe",
  description:
    "Join the TogetherWe community and start making a difference through events, volunteering, and social impact.",
}

export default function RegisterPage() {
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

      <section className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_30px_80px_-40px_rgba(12,81,38,0.45)] lg:grid-cols-[0.92fr_1.08fr]">
          <RegisterPromoPanel />
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

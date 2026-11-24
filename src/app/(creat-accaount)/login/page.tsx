import type { Metadata } from "next"
import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Log In | TogetherWe",
  description: "Log in to your TogetherWe account.",
}

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f4f9ef] px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white p-8 text-center shadow-[0_24px_60px_-36px_rgba(12,81,38,0.4)]">
        <div className="flex justify-center">
          <BrandLogo showTagline />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold text-brand-strong">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          The login form is coming soon. In the meantime, you can create an
          account and join the community.
        </p>
        <Link
          href="/register"
          className={buttonVariants({
            variant: "brand",
            size: "pill",
            className: "mt-6",
          })}
        >
          Create an account
        </Link>
      </div>
    </main>
  )
}

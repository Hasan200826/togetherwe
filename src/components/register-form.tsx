"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type RegisterFormState = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterErrors = Partial<
  Record<keyof RegisterFormState | "terms", string>
>

const INITIAL_FORM: RegisterFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const FIELD_ORDER: (keyof RegisterErrors)[] = [
  "fullName",
  "email",
  "password",
  "confirmPassword",
  "terms",
]

const FIELD_IDS: Record<keyof RegisterErrors, string> = {
  fullName: "register-full-name",
  email: "register-email",
  password: "register-password",
  confirmPassword: "register-confirm-password",
  terms: "register-terms",
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  )
}

export function RegisterForm() {
  const [form, setForm] = useState<RegisterFormState>(INITIAL_FORM)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function updateField(field: keyof RegisterFormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!previous[field]) {
        return previous
      }

      const next = { ...previous }
      delete next[field]
      return next
    })

    if (submitted) {
      setSubmitted(false)
    }
  }

  function updateAgreement(checked: boolean) {
    setAgreed(checked)
    setErrors((previous) => {
      if (!previous.terms) {
        return previous
      }

      const next = { ...previous }
      delete next.terms
      return next
    })

    if (submitted) {
      setSubmitted(false)
    }
  }

  function validate() {
    const next: RegisterErrors = {}
    const fullName = form.fullName.trim()
    const email = form.email.trim()

    if (fullName.length < 2) {
      next.fullName = "Please enter your full name."
    }

    if (!email) {
      next.email = "Please enter your email address."
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = "Please enter a valid email address."
    }

    if (!form.password) {
      next.password = "Please create a password."
    } else if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters."
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password."
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords do not match."
    }

    if (!agreed) {
      next.terms = "Please accept the Terms & Conditions and Privacy Policy."
    }

    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field])

    if (firstInvalidField) {
      setSubmitted(false)
      document.getElementById(FIELD_IDS[firstInvalidField])?.focus()

      if (firstInvalidField === "terms") {
        requestAnimationFrame(() => {
          document
            .getElementById("register-terms-error")
            ?.scrollIntoView({ behavior: "smooth", block: "center" })
        })
      }

      return
    }

    const formInfo = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      agreedToTerms: agreed,
    }

    console.log("Register form info:", formInfo)
    setSubmitted(true)
  }

  return (
    <section className="bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 overflow-hidden rounded-2xl bg-[linear-gradient(125deg,#083f20_0%,#0c5126_55%,#16803d_100%)] px-5 py-5 text-white lg:hidden">
          <BrandLogo tone="on-dark" showTagline />
          <h2 className="mt-4 font-heading text-lg font-bold">
            Join Our <span className="text-[#a7edb0]">Community!</span>
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/75">
            Be a part of something bigger. Together, we can build a cleaner,
            greener and kinder world.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <span className="grid size-16 place-items-center rounded-full bg-brand-soft ring-1 ring-brand/10">
              <span className="grid size-11 place-items-center rounded-full bg-white text-brand shadow-sm">
                <UserPlus aria-hidden="true" className="size-5" />
              </span>
            </span>
            <Sparkles
              aria-hidden="true"
              className="absolute -top-1.5 -right-2 size-4 text-brand-bright"
            />
          </div>

          <h1
            id="register-title"
            className="mt-4 font-heading text-[1.65rem] leading-tight font-extrabold text-brand-strong sm:text-3xl"
          >
            Create Your <span className="text-brand">Account</span>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Fill in the details below to join TogetherWe
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby="register-title"
          className="mt-6 space-y-3.5"
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="register-full-name"
              className="text-[0.8rem] font-semibold text-zinc-800"
            >
              Full Name
              <span aria-hidden="true" className="text-brand">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <div className="relative">
              <User
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-400"
              />
              <Input
                id="register-full-name"
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "register-full-name-error" : undefined
                }
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                className="h-11 rounded-xl border-zinc-200 bg-white pr-3.5 pl-10 text-sm shadow-none placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-brand/20"
              />
            </div>
            {errors.fullName ? (
              <p
                id="register-full-name-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="register-email"
              className="text-[0.8rem] font-semibold text-zinc-800"
            >
              Email Address
              <span aria-hidden="true" className="text-brand">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-400"
              />
              <Input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                placeholder="Enter your email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
                onChange={(event) => updateField("email", event.target.value)}
                className="h-11 rounded-xl border-zinc-200 bg-white pr-3.5 pl-10 text-sm shadow-none placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-brand/20"
              />
            </div>
            {errors.email ? (
              <p
                id="register-email-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="register-password"
              className="text-[0.8rem] font-semibold text-zinc-800"
            >
              Password
              <span aria-hidden="true" className="text-brand">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-400"
              />
              <Input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                placeholder="Create a strong password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                className="h-11 rounded-xl border-zinc-200 bg-white pr-10 pl-10 text-sm shadow-none placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-brand/20"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p
                id="register-password-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="register-confirm-password"
              className="text-[0.8rem] font-semibold text-zinc-800"
            >
              Confirm Password
              <span aria-hidden="true" className="text-brand">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-400"
              />
              <Input
                id="register-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirmPassword}
                placeholder="Confirm your password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? "register-confirm-password-error"
                    : undefined
                }
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                className="h-11 rounded-xl border-zinc-200 bg-white pr-10 pl-10 text-sm shadow-none placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-brand/20"
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                onClick={() =>
                  setShowConfirmPassword((visible) => !visible)
                }
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p
                id="register-confirm-password-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5 pt-0.5">
            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-zinc-600">
              <Checkbox
                id="register-terms"
                name="terms"
                checked={agreed}
                onCheckedChange={(checked) =>
                  updateAgreement(checked === true)
                }
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={
                  errors.terms ? "register-terms-error" : undefined
                }
                className="mt-0.5 border-zinc-300 data-checked:border-brand data-checked:bg-brand data-checked:text-white"
              />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  className="font-semibold text-brand hover:underline"
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  className="font-semibold text-brand hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms ? (
              <p
                id="register-terms-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.terms}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="brand"
            className="mt-1 h-11 w-full rounded-xl text-sm font-semibold"
          >
            <UserPlus aria-hidden="true" className="size-4" />
            Register
          </Button>

          {submitted ? (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-xl border border-brand/20 bg-brand-soft px-3.5 py-3 text-brand-strong"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand"
              />
              <p className="text-xs leading-relaxed">
                Registration info logged to the console. Check your browser
                dev tools.
              </p>
            </div>
          ) : null}

          <div
            role="separator"
            aria-label="or continue with"
            className="flex items-center gap-3 pt-1 text-[0.68rem] font-semibold tracking-[0.14em] text-zinc-400 uppercase"
          >
            <span aria-hidden="true" className="h-px flex-1 bg-zinc-200" />
            OR
            <span aria-hidden="true" className="h-px flex-1 bg-zinc-200" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log("Continue with Google")}
              className={cn(
                "h-10 rounded-xl border-zinc-200 bg-white px-2 text-[0.7rem] font-semibold text-zinc-700 shadow-none hover:bg-zinc-50 sm:text-xs"
              )}
            >
              <GoogleIcon className="size-4 shrink-0" />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log("Continue with GitHub")}
              className={cn(
                "h-10 rounded-xl border-zinc-200 bg-white px-2 text-[0.7rem] font-semibold text-zinc-700 shadow-none hover:bg-zinc-50 sm:text-xs"
              )}
            >
              <GitHubIcon className="size-4 shrink-0" />
              Continue with GitHub
            </Button>
          </div>

          <p className="pt-1 text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              Log in
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}


"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

// Google Icon
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
  );
}

// GitHub Icon
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const route= useRouter()

  // Form Submit Function
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const info = {
      email: formData.get("email"),
      password: formData.get("password"),
      rememberMe: rememberMe,
    };

    console.log("Login Information:", info);
    const{data ,error}= await authClient.signIn.email({
      ...info as {email: string,password:string,rememberMe: boolean}
    })
    if(!error){
      route.refresh()
      redirect('/')

    }
  };

  return (
    <div>
      {/* Login Card */}
      <div className="w-full rounded-2xl border border-green-100 bg-white px-5 py-7 shadow-[0_4px_20px_rgba(0,80,40,0.08)] sm:px-8 sm:py-9">

        {/* Header */}
        <div className="mb-7 flex flex-col items-center text-center">

          {/* Lock Icon */}
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f4e5]">
            <LockKeyhole
              size={34}
              strokeWidth={2.5}
              className="text-green-800"
            />

            <span className="absolute -right-3 -top-1 rotate-12 text-lg font-bold text-green-700">
              〃
            </span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Login to <span className="text-green-700">TogetherWe</span>
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Enter your details to access your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-800">
              Email Address
            </Label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="h-11 rounded-lg border-gray-200 pl-10 text-xs shadow-none focus-visible:border-green-700 focus-visible:ring-green-700/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold text-gray-800">
              Password
            </Label>

            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="h-11 rounded-lg border-gray-200 px-10 pr-10 text-xs shadow-none focus-visible:border-green-700 focus-visible:ring-green-700/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-2">

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  setRememberMe(checked === true)
                }
                className="h-4 w-4 border-green-700 data-[state=checked]:bg-green-800 data-[state=checked]:text-white"
              />

              <Label
                htmlFor="remember"
                className="cursor-pointer text-xs text-gray-700"
              >
                Remember me
              </Label>
            </div>

            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-green-700 hover:text-green-900"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-green-800 text-sm font-semibold text-white hover:bg-green-900"
          >
            <LogIn size={17} className="mr-2" />
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-lg border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
            >
              <GoogleIcon className="size-4 shrink-0" />
              Continue with Google
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-lg border-gray-200 text-xs font-medium text-gray-800 hover:bg-gray-50"
            >
              <GitHubIcon className="size-4 shrink-0" />
              Continue with GitHub
            </Button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1 text-center text-xs">
          <span className="text-gray-600">
            Don't have an account?
          </span>

          <Link
            href="/register"
            className="inline-flex items-center gap-1 font-semibold text-green-700 hover:text-green-900"
          >
            Create an account
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { ProfileDropdown } from "./profile-dropdown";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="TogetherWe home"
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-9 shrink-0">
        <path
          d="M20 34C9.5 32.2 5.2 23.6 6.4 13.4c9.6 2.6 14 10.5 13.6 20.6Z"
          className="fill-brand"
        />
        <path
          d="M20 34c10.5-1.8 14.8-10.4 13.6-20.6-9.6 2.6-14 10.5-13.6 20.6Z"
          className="fill-brand-bright"
        />
        <path
          d="M20 35V16.5"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="stroke-brand-strong"
        />
        <circle cx="20" cy="7.5" r="4.2" className="fill-brand-strong" />
      </svg>
      <span className="text-[22px] leading-none font-bold tracking-tight text-brand-strong">
        Together<span className="text-brand-bright">We</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <header className="sticky top-0 z-50 h-18 w-full border-b bg-white" />
    );
  }
  console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 shadow-[0_1px_12px_rgba(12,81,38,0.06)] backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Logo />

        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  active
                    ? "bg-brand text-white shadow-sm"
                    : "text-zinc-800 hover:bg-brand-soft hover:text-brand-strong",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label="Search"
            className="rounded-full text-zinc-700 hover:bg-brand-soft hover:text-brand-strong"
          >
            <Search className="size-5" strokeWidth={2.25} />
          </Button>

          <span
            aria-hidden="true"
            className="hidden h-7 w-px bg-zinc-200 lg:block"
          />
          {user ? (
            <ProfileDropdown />
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "brand-outline",
                  size: "pill",
                })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "brand", size: "pill" })}
              >
                Register
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="rounded-full text-brand-strong hover:bg-brand-soft lg:hidden"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-sm gap-0 bg-white p-0"
            >
              <SheetHeader className="border-b border-zinc-100 p-5">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <SheetClose
                      key={item.href}
                      render={<Link href={item.href} />}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                        active
                          ? "bg-brand text-white"
                          : "text-zinc-800 hover:bg-brand-soft hover:text-brand-strong",
                      )}
                    >
                      {item.label}
                    </SheetClose>
                  );
                })}
              </nav>
              {user ? (
                <ProfileDropdown />
              ) : (
                <SheetFooter className="gap-3 p-4 pt-0">
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "brand-outline",
                      size: "pill",
                    })}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: "brand",
                      size: "pill",
                    })}
                  >
                    Register
                  </Link>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

'use client'

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ProfileDropdown } from "./profile-dropdown";
import { cn } from "cn";

import { authClient } from "@/lib/auth-client";

type ProfileAcountProps = {
  /** "header" = inline in the top bar, "sheet" = stacked inside the mobile menu */
  variant?: "header" | "sheet";
  className?: string;
};

const SHEET_SHELL = "w-full shrink-0 border-t border-zinc-100 p-4";

const ProfileAcount = ({
  variant = "header",
  className,
}: ProfileAcountProps) => {
  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center",
          variant === "sheet" ? cn(SHEET_SHELL, "flex-col gap-3") : "gap-2",
          className,
        )}
      >
        <span className="size-9 shrink-0 animate-pulse rounded-full bg-zinc-100" />
        {variant === "sheet" && (
          <>
            <span className="h-10 w-full animate-pulse rounded-full bg-zinc-100" />
            <span className="h-10 w-full animate-pulse rounded-full bg-zinc-100" />
          </>
        )}
      </div>
    );
  }

  if (user) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center",
          variant === "sheet" && SHEET_SHELL,
          className,
        )}
      >
        <ProfileDropdown />
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "sheet"
          ? cn(SHEET_SHELL, "flex flex-col gap-3")
          : "hidden items-center gap-3 lg:flex",
        className,
      )}
    >
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "brand-outline", size: "pill" }),
          variant === "sheet" && "w-full",
        )}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "brand", size: "pill" }),
          variant === "sheet" && "w-full",
        )}
      >
        Register
      </Link>
    </div>
  );
};

export default ProfileAcount;

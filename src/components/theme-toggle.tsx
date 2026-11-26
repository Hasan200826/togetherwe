"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  /** "icon" for the navbar, "menu" for the mobile sheet */
  variant?: "icon" | "menu";
  className?: string;
};

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? "Light Mode" : "Dark Mode";

  // Icon and text are switched with CSS from the class on <html>, so they are
  // correct on the very first paint even before React finishes hydrating.
  const icons = (
    <>
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </>
  );

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${label}`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "default" }),
          "w-full justify-start gap-3 rounded-xl px-4 py-3 text-sm font-semibold",
          className
        )}
      >
        {icons}
        <span className="dark:hidden">Dark Mode</span>
        <span className="hidden dark:block">Light Mode</span>
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      onClick={toggleTheme}
      aria-label={`Switch to ${label}`}
      title={label}
      className={cn(
        "rounded-full text-zinc-700 hover:bg-brand-soft hover:text-brand-strong",
        className
      )}
    >
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
    </Button>
  );
}

"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

let currentTheme: Theme = "light";
const listeners = new Set<() => void>();

function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

// Runs as soon as the client bundle loads, before hydration, so a saved dark
// theme is applied without a flash. No <script> is rendered by React.
if (typeof window !== "undefined") {
  currentTheme = readStoredTheme();
  applyTheme(currentTheme);
}

export function setTheme(theme: Theme) {
  if (currentTheme === theme) return;

  currentTheme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the in-memory theme still works.
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

export function useTheme() {
  // Server and first client render are both light, so hydration matches.
  // The saved theme is synced on the next microtask, then kept in sync by
  // listeners whenever setTheme runs. Icons/labels are CSS-driven, so visuals
  // are correct even before this state catches up.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const sync = () => setThemeState(currentTheme);
    listeners.add(sync);
    queueMicrotask(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return { theme, setTheme, toggleTheme };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

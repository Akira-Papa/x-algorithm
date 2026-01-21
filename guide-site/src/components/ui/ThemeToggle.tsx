"use client";

import { useCallback, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

function getThemeSnapshot() {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function getServerSnapshot() {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  window.addEventListener("storage", callback);

  // Apply theme on initial subscription
  const theme = getThemeSnapshot();
  document.documentElement.classList.toggle("dark", theme === "dark");

  return () => {
    mediaQuery.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribeToMounted(_callback: () => void) {
  // Mounted state doesn't change after initial mount
  return () => {};
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(subscribeToMounted, getMountedSnapshot, getMountedServerSnapshot);

  const toggleTheme = useCallback(() => {
    const currentTheme = getThemeSnapshot();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    // Trigger storage event for useSyncExternalStore
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-lg p-2 hover:bg-accent"
        aria-label="テーマを切り替える"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-lg p-2 transition-colors hover:bg-accent",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      aria-label={`${theme === "light" ? "ダーク" : "ライト"}モードに切り替える`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "ts-course-theme";

function getSystemPreference() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredPreference(): string {
  if (typeof window === "undefined") return "dark";
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: string) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [preference, setPreference] = useState<string>("dark");
  const [theme, setThemeState] = useState<string>("dark");

  useEffect(() => {
    const stored = getStoredPreference();
    setPreference(stored);
    const resolved = stored === "auto" ? getSystemPreference() : stored;
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    if (preference !== "auto") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const next = e.matches ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [preference]);

  const setMode = useCallback((newMode: string) => {
    setPreference(newMode);
    try {
      localStorage.setItem(THEME_KEY, newMode);
    } catch {}

    if (newMode === "auto") {
      const system = getSystemPreference();
      setThemeState(system);
      applyTheme(system);
    } else {
      setThemeState(newMode);
      applyTheme(newMode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setMode(next);
  }, [theme, setMode]);

  return { theme, preference, setMode, toggleTheme };
}

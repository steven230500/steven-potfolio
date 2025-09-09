import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToId(id: string) {
  const el = typeof document !== "undefined" ? document.getElementById(id) : null
  if (!el) return
  try {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  } catch {
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: "smooth" })
  }
}
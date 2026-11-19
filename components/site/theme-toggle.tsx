"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "./icons"
import { useLanguage } from "@/lib/language-context"
import { withViewTransition } from "@/lib/view-transition"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    // The reveal circle grows from the button that was pressed.
    const root = document.documentElement
    const x = e.clientX || window.innerWidth
    const y = e.clientY || 0
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty("--vt-x", `${x}px`)
    root.style.setProperty("--vt-y", `${y}px`)
    root.style.setProperty("--vt-r", `${r}px`)

    withViewTransition("vt-theme", () => flushSync(() => setTheme(isDark ? "light" : "dark")))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.nav.themeToLight : t.nav.themeToDark}
      className={cn(
        "relative grid size-9 place-items-center rounded-full text-text-2 transition-colors duration-[var(--dur-1)] hover:bg-surface-2 hover:text-text",
        className,
      )}
    >
      {/* Both icons are stacked; the visible one rotates in. */}
      <Sun
        size={18}
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,rotate] duration-[var(--dur-2)] ease-[var(--ease-out)] motion-reduce:transition-none",
          isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
        )}
      />
      <Moon
        size={18}
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,rotate] duration-[var(--dur-2)] ease-[var(--ease-out)] motion-reduce:transition-none",
          isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
        )}
      />
    </button>
  )
}

"use client"

import { useEffect, useState } from "react"
import { contact } from "@/lib/content"
import { useLanguage } from "@/lib/language-context"

/** Live clock for Cartagena. Rendered only after mount to avoid a hydration mismatch. */
export function LocalTime() {
  const { language } = useLanguage()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  if (!now) return <span className="tabular inline-block min-w-[4.5em]">&nbsp;</span>

  const time = new Intl.DateTimeFormat(language === "es" ? "es-CO" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: contact.timeZone,
  }).format(now)

  return (
    <time className="tabular" dateTime={now.toISOString()}>
      {time}
    </time>
  )
}

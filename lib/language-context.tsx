"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { flushSync } from "react-dom"
import { translations, type Dictionary, type Language } from "./translations"
import { withViewTransition } from "./view-transition"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Dictionary
}

const STORAGE_KEY = "lang"
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === "en" || saved === "es") setLanguageState(saved)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    withViewTransition("vt-fade", () => flushSync(() => setLanguageState(lang)))
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [])

  const toggleLanguage = useCallback(
    () => setLanguage(language === "en" ? "es" : "en"),
    [language, setLanguage],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

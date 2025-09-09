"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className="bg-background/80 backdrop-blur-sm"
      >
        {language === "en" ? "ES" : "EN"}
      </Button>
    </div>
  )
}

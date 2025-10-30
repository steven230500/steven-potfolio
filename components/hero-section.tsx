"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { scrollToId } from "@/lib/utils"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Fondo decorativo: no bloquea clics */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />

      {/* Shapes decorativas: no bloquean clics */}
      <div className="pointer-events-none absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float" />
      <div
        className="pointer-events-none absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-lg rotate-45 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="pointer-events-none absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="pointer-events-none absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-lg animate-float"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <div className="mb-8 sm:mb-12 animate-slide-in-up">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs sm:text-sm font-medium border border-accent/20">
              Systems Engineer
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
            Steven Patiño Urquijo
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 text-muted-foreground font-medium px-4">
            {t.title}
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
            <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-accent mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground break-all">steven230500@outlook.com</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
            <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-accent mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground">+57 3022908439</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 sm:col-span-2 md:col-span-1">
            <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-accent mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground">Cartagena, Colombia</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <Button
            variant="outline"
            size="default"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent text-sm sm:text-base w-full sm:w-auto"
            asChild
          >
            <a href="https://github.com/steven230500?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 sm:w-5 h-4 sm:h-5" />
              GitHub
              <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="default"
            className="gap-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105 bg-transparent text-sm sm:text-base w-full sm:w-auto"
            asChild
          >
            <a href="https://www.linkedin.com/in/steven-p-0ab502126/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
              LinkedIn
              <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="default"
            className="gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 bg-transparent text-sm sm:text-base w-full sm:w-auto"
            onClick={() => scrollToId("contact")}
          >
            <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
            Contact
          </Button>
        </div>
      </div>
    </section>
  )
}

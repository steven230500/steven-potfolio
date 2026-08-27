"use client"

import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { scrollToId } from "@/lib/utils"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_20%_30%,black,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <div className="animate-slide-in-up">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-5">
              Systems Engineer · Full Stack
            </p>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] text-foreground text-balance mb-6">
              Steven Patiño Urquijo
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty mb-8">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/steven230500?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border rounded-md px-4 py-2 text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <a
                href="https://www.linkedin.com/in/steven-p-0ab502126/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border rounded-md px-4 py-2 text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <button
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>

          <div
            className="animate-slide-in-up rounded-lg border border-border bg-card overflow-hidden font-mono text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
              <span className="ml-2 text-xs text-muted-foreground">whoami</span>
            </div>
            <div className="p-5 space-y-3 text-[13px] leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-accent">$</span> whoami
              </p>
              <p className="text-foreground pl-3">Cartagena, Colombia</p>
              <p className="text-foreground pl-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Remote-friendly
              </p>

              <p className="text-muted-foreground pt-2">
                <span className="text-accent">$</span> cat experience.txt
              </p>
              <p className="text-foreground pl-3">7+ años · mobile, web & backend</p>
              <p className="text-foreground pl-3">Co-Founder @ iHabitar</p>

              <p className="text-muted-foreground pt-2">
                <span className="text-accent">$</span> cat contact.txt
              </p>
              <p className="pl-3 flex items-center gap-1.5 text-foreground break-all">
                <Mail className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                steven230500@outlook.com
              </p>
              <p className="pl-3 flex items-center gap-1.5 text-foreground">
                <Phone className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                +57 302 290 8439
              </p>

              <p className="text-muted-foreground pt-2 flex items-center gap-1">
                <span className="text-accent">$</span>
                <span className="inline-block w-2 h-4 bg-accent animate-caret" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

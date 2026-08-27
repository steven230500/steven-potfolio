"use client"

import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  const facts: [string, string][] = [
    [t.experience, t.experienceValue],
    [t.education, "Systems Engineer"],
    [t.specialization, t.specializationValue],
    [t.currentRole, t.currentRoleValue],
    [t.location, t.locationValue],
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-14">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
          01 · {t.aboutTitle}
        </p>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16">
          <div className="space-y-5 border-l-2 border-border pl-6">
            <p className="text-lg leading-relaxed text-pretty text-foreground">{t.aboutDescription1}</p>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{t.aboutDescription2}</p>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{t.aboutDescription3}</p>
          </div>

          <div className="rounded-lg border border-border bg-card font-mono text-sm overflow-hidden self-start">
            <div className="px-4 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              {t.quickFacts}
            </div>
            <dl className="divide-y divide-border">
              {facts.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground shrink-0">{label}</dt>
                  <dd className="text-foreground text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

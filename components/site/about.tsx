"use client"

import { useLanguage } from "@/lib/language-context"
import { Section } from "./section"

export function About() {
  const { t } = useLanguage()
  const f = t.about.facts
  const facts: [string, string][] = [
    [f.based, f.basedValue],
    [f.studied, f.studiedValue],
    [f.languages, f.languagesValue],
    [f.availability, f.availabilityValue],
  ]

  return (
    <Section id="about" title={t.about.title}>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="max-w-[var(--measure)] space-y-5 lg:order-2 lg:ml-auto">
          <p className="text-lead text-text text-pretty">{t.about.p1}</p>
          <p className="text-text-2 text-pretty">{t.about.p2}</p>
          <p className="text-text-2 text-pretty">{t.about.p3}</p>
        </div>

        <dl className="flex flex-col gap-5 lg:order-1 lg:w-64 lg:shrink-0">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-meta text-text-3">{label}</dt>
              <dd className="mt-0.5 text-small font-semibold text-text">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

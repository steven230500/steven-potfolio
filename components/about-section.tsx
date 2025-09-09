"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 bg-background scroll-mt-28 md:scroll-mt-40">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.aboutTitle}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-pretty">{t.aboutDescription1}</p>

            <p className="text-lg leading-relaxed text-pretty">{t.aboutDescription2}</p>

            <p className="text-lg leading-relaxed text-pretty">{t.aboutDescription3}</p>
          </div>

          <Card className="bg-muted">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t.quickFacts}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">{t.experience}:</span>
                  <span>{t.experienceValue}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t.education}:</span>
                  <span>Systems Engineer</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t.specialization}:</span>
                  <span>{t.specializationValue}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t.currentRole}:</span>
                  <span>{t.currentRoleValue}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">{t.location}:</span>
                  <span>{t.locationValue}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ExperienceSection() {
  const { t } = useLanguage()

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "FALP",
      location: "Santiago de Chile, Chile",
      period: `Jun 2023 - ${t.present}`,
      description: t.falpDesc,
      technologies: ["React Native", "Flutter", "Node.js", "AWS", "Firebase"],
      projects: [
        { name: "Mi FALP (Android)", url: "https://play.google.com/store/apps/details?id=com.appFalp&hl=es_CO" },
        { name: "Mi FALP (iOS)", url: "https://apps.apple.com/cl/app/mi-falp/id6460034866" },
        { name: "EduCancer", url: "https://play.google.com/store/apps/details?id=com.educancer&hl=es_CO" },
      ],
    },
    {
      title: "Co-Founder & Full Stack Developer",
      company: "iHabitar",
      location: "Cartagena, Colombia",
      period: `Oct 2024 - ${t.present}`,
      description: t.iHabitarDesc,
      technologies: ["React", "Next.js", "Flutter", "TypeScript"],
      projects: [{ name: "iHabitar Platform", url: "https://ihabitar.com/" }],
    },
    {
      title: "Sr. Mobile Developer",
      company: "DD360",
      location: "Mexico City, Mexico",
      period: "Apr 2023 - Oct 2023",
      description: t.dd360Desc,
      technologies: ["Flutter", "BLoC", "Unity", "Clean Architecture"],
      projects: [{ name: "DD360 Platform", url: "https://dd360.mx/" }],
    },
    {
      title: "Sr. Mobile Developer",
      company: "Tul S.A.S",
      location: "Bogota, Colombia",
      period: "Jul 2022 - Feb 2023",
      description: t.tulDesc,
      technologies: ["Flutter", "BLoC", "Firebase", "Sentry"],
      projects: [
        { name: "TUL Backoffice", url: "https://play.google.com/store/apps/details?id=co.com.tul.backoffice&hl=es_CO" },
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Asap507",
      location: "Ciudad de Panamá, Panamá",
      period: "Jul 2021 - Sep 2022",
      description: t.asapDesc,
      technologies: ["Flutter", "Node.js", "AWS", "Microservices"],
      projects: [
        { name: "ASAP Website", url: "https://asap507.com/" },
        {
          name: "ASAP Courier (Android)",
          url: "https://play.google.com/store/apps/details?id=com.asap.courier&hl=es_CO",
        },
        { name: "ASAP (iOS)", url: "https://apps.apple.com/es/app/asap/id1113558289" },
      ],
    },
    {
      title: "Mobile Developer",
      company: "Casa toro",
      location: "Bogota, Colombia",
      period: "Nov 2020 - Jul 2022",
      description: t.casaToroDesc,
      technologies: ["React Native", "Redux", "Payment Integration"],
      projects: [{ name: "Bellpi", url: "https://www.bellpi.com/" }],
    },
    {
      title: "Mobile Developer",
      company: "Smartinfo",
      location: "Cartagena, Colombia",
      period: "Nov 2020 - Feb 2021",
      description: t.smartinfoDesc,
      technologies: ["Flutter", "MobX", "PHP", "Modular"],
      projects: [],
    },
    {
      title: "Web programmer",
      company: "Agencia GUIDOULLOA & ASOCIADOS S.A",
      location: "Cartagena, Colombia",
      period: "Dec 2018 - Nov 2020",
      description: t.guidoulloaDesc,
      technologies: ["Flutter", "Laravel", "PHP", "React Native", "Node.js", "MongoDB"],
      projects: [
        { name: "Clínica Medihelp", url: "https://www.clinicamedihelp.com/" },
        { name: "El Getsemanicense", url: "https://elgetsemanicense.com/" },
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-background scroll-mt-28 md:scroll-mt-40">

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.experienceTitle}</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-muted">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold">{exp.company}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4 leading-relaxed text-pretty">{exp.description}</p>

                {exp.projects && exp.projects.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">{t.projects}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map((project, projectIndex) => (
                        <Button
                          key={projectIndex}
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8 text-xs bg-transparent"
                        >
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            {project.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

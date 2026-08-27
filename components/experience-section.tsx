"use client"

import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ExperienceSection() {
  const { t } = useLanguage()

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "FALP",
      location: "Santiago de Chile, Chile",
      period: "Jun 2023 – Nov 2025",
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
      period: `Oct 2024 – ${t.present}`,
      description: t.iHabitarDesc,
      technologies: ["React", "Next.js", "Flutter", "TypeScript"],
      projects: [{ name: "iHabitar Platform", url: "https://ihabitar.com/" }],
    },
    {
      title: "Sr. Mobile Developer",
      company: "DD360",
      location: "Mexico City, Mexico",
      period: "Apr 2023 – Oct 2023",
      description: t.dd360Desc,
      technologies: ["Flutter", "BLoC", "Unity", "Clean Architecture"],
      projects: [{ name: "DD360 Platform", url: "https://dd360.mx/" }],
    },
    {
      title: "Sr. Mobile Developer",
      company: "Tul S.A.S",
      location: "Bogota, Colombia",
      period: "Jul 2022 – Feb 2023",
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
      period: "Jul 2021 – Sep 2022",
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
      period: "Nov 2020 – Jul 2022",
      description: t.casaToroDesc,
      technologies: ["React Native", "Redux", "Payment Integration"],
      projects: [{ name: "Bellpi", url: "https://www.bellpi.com/" }],
    },
    {
      title: "Mobile Developer",
      company: "Smartinfo",
      location: "Cartagena, Colombia",
      period: "Nov 2020 – Feb 2021",
      description: t.smartinfoDesc,
      technologies: ["Flutter", "MobX", "PHP", "Modular"],
      projects: [],
    },
    {
      title: "Web programmer",
      company: "Agencia GUIDOULLOA & ASOCIADOS S.A",
      location: "Cartagena, Colombia",
      period: "Dec 2018 – Nov 2020",
      description: t.guidoulloaDesc,
      technologies: ["Flutter", "Laravel", "PHP", "React Native", "Node.js", "MongoDB"],
      projects: [
        { name: "Clínica Medihelp", url: "https://www.clinicamedihelp.com/" },
        { name: "El Getsemanicense", url: "https://elgetsemanicense.com/" },
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-14 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10">
          03 · {t.experienceTitle}
        </p>

        <div className="relative pl-6 sm:pl-8 border-l border-border space-y-12">
          {experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="relative">
              <span className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-background border-2 border-accent" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.title} <span className="text-muted-foreground font-normal">· {exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground shrink-0">{exp.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{exp.location}</p>

              <p className="text-foreground leading-relaxed text-pretty mb-4">{exp.description}</p>

              {exp.projects.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
                  {exp.projects.map((project) => (
                    <a
                      key={project.url}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline underline-offset-4"
                    >
                      {project.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}

              <p className="font-mono text-xs text-muted-foreground">
                {exp.technologies.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

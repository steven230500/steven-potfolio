"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type FeaturedProject = {
  name: string;
  domain: string;
  url: string;
  image?: string;
  logo?: string;
  industry: { en: string; es: string };
  blurb: { en: string; es: string };
  stack: string[];
};

const featured: FeaturedProject[] = [
  {
    name: "Bocan Contracting",
    domain: "bocancontracting.ca",
    url: "https://www.bocancontracting.ca/",
    image: "/projects/bocan/hero-construction.jpg",
    logo: "/projects/bocan/logo.png",
    industry: { en: "Construction · Canada / Colombia", es: "Construcción · Canadá / Colombia" },
    blurb: {
      en: "Bilingual (EN/ES) marketing site for a 25+ year contracting firm: division tabs, before/after slider with lightbox, and a project gallery pulled from real job sites.",
      es: "Sitio bilingüe (EN/ES) para una constructora con 25+ años: tabs de divisiones, slider antes/después con lightbox y galería de proyectos reales.",
    },
    stack: ["Next.js 16", "Tailwind v4", "Vercel"],
  },
  {
    name: "Casa Vida",
    domain: "casavidactg.com",
    url: "https://casavidactg.com/",
    image: "/projects/casa-vida/real-worship.jpg",
    logo: "/projects/casa-vida/logo.png",
    industry: { en: "Church · Cartagena", es: "Iglesia · Cartagena" },
    blurb: {
      en: "Public site plus an admin panel with real roles (admin/pastor/servidor), an appointment calendar, and a separate dynamic form builder — both apps share one Postgres on a single droplet.",
      es: "Sitio público más panel admin con roles reales (admin/pastor/servidor), calendario de citas, y un constructor de formularios dinámicos aparte — ambas apps comparten un Postgres en un solo droplet.",
    },
    stack: ["Next.js", "Postgres", "Docker Compose", "GitHub Actions"],
  },
  {
    name: "Reformar IPS",
    domain: "reformaripsfundacion.co",
    url: "https://www.reformaripsfundacion.co/",
    image: "/projects/reformar-ips/site.jpg",
    industry: { en: "Healthcare · Bolívar", es: "Salud · Bolívar" },
    blurb: {
      en: "Health foundation site rebuilt as a static export and shipped to FTP-only hosting — 11 API routes ported to PHP so the appointment integration keeps working without a Node server.",
      es: "Sitio de fundación de salud reconstruido como export estático para hosting solo-FTP — 11 endpoints migrados a PHP para que la integración de citas siga funcionando sin servidor Node.",
    },
    stack: ["Next.js (static export)", "PHP", "GitHub Actions", "Tailscale"],
  },
  {
    name: "Grupo La Fe",
    domain: "grupolafecartagena.org",
    url: "https://www.grupolafecartagena.org/",
    logo: "/projects/grupo-la-fe/logo.png",
    industry: { en: "Gambling recovery support · Cartagena", es: "Apoyo recuperación ludopatía · Cartagena" },
    blurb: {
      en: "Anonymous support group for gambling addiction recovery — no photos of real attendees, by design. Runs on a shared Caddy reverse proxy alongside this portfolio, auto-HTTPS.",
      es: "Grupo de apoyo anónimo para recuperación de ludopatía — sin fotos de asistentes, por diseño. Corre en un Caddy compartido junto a este portafolio, con HTTPS automático.",
    },
    stack: ["Next.js 14", "Docker", "Caddy"],
  },
];

const other = [
  {
    name: "iforevents",
    url: "https://iforevents.com/",
    blurb: {
      en: "Event analytics & tracking API — Go, ClickHouse, Redis, RabbitMQ. Self-hosted via Docker.",
      es: "API de analítica y tracking de eventos — Go, ClickHouse, Redis, RabbitMQ. Self-hosted con Docker.",
    },
  },
  {
    name: "What to do Cartagena",
    url: "https://whattodocartagena.com/",
    blurb: {
      en: "Interactive tourist guide with a Leaflet map, local events and routes.",
      es: "Guía turística interactiva con mapa Leaflet, eventos locales y rutas.",
    },
  },
];

export function ProjectsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-14 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
          04 · {t.projectsTitle}
        </p>
        <p className="text-muted-foreground max-w-2xl mb-10">
          {language === "es"
            ? "Sitios en producción, hoy, para clientes reales — no solo el frontend, también la infraestructura que los mantiene corriendo."
            : "Sites in production, today, for real clients — not just the frontend, also the infrastructure keeping them running."}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featured.map((p) => (
            <a
              key={p.domain}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-card overflow-hidden hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
                <span className="ml-2 flex-1 truncate rounded bg-background/60 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {p.domain}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </div>

              <div className="relative h-44 sm:h-52 overflow-hidden bg-background">
                {p.image ? (
                  <>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    {p.logo && (
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-md bg-background/90 border border-border p-1.5">
                        <div className="relative w-full h-full">
                          <Image src={p.logo} alt="" fill className="object-contain" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0e1219]">
                    {p.logo && (
                      <div className="relative w-32 h-32">
                        <Image src={p.logo} alt={p.name} fill className="object-contain" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-3">{p.industry[language]}</p>
                <p className="text-sm text-foreground leading-relaxed text-pretty mb-4">
                  {p.blurb[language]}
                </p>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-live" />
                  <span className="text-status-live">deployed</span>
                  <span className="text-muted-foreground">· {p.stack.join(" · ")}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-5">
          {language === "es" ? "Otros builds" : "Other builds"}
        </p>
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {other.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background p-5 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-semibold text-foreground">{p.name}</h4>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-accent" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.blurb[language]}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

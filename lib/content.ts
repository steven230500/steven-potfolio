import type { Language } from "./translations"

export type Localized = Record<Language, string>

export const contact = {
  email: "steven230500@outlook.com",
  phoneDisplay: "+57 302 290 8439",
  phoneHref: "tel:+573022908439",
  whatsapp: "https://wa.me/573022908439",
  github: "https://github.com/steven230500",
  linkedin: "https://www.linkedin.com/in/steven-p-0ab502126/",
  timeZone: "America/Bogota",
}

export type Project = {
  name: string
  domain: string
  url: string
  image?: string
  logo?: string
  role?: Localized
  sector: Localized
  summary: Localized
  operated: Localized
  stack: string[]
  apps?: { name: Localized; appStore: string; googlePlay: string }[]
}

export const projects: Project[] = [
  {
    name: "iHabitar",
    domain: "ihabitar.com",
    url: "https://ihabitar.com/",
    role: { en: "Co-founder, developer", es: "Cofundador, desarrollador" },
    sector: { en: "Residential property management", es: "Gestión de conjuntos residenciales" },
    summary: {
      en: "A platform for residential complexes: a React/Next.js web app, a Go and PostgreSQL backend, and Flutter apps for residents and staff. I integrated JEV into the help assistant so people can ask questions in plain language and get an answer from the help center.",
      es: "Plataforma para conjuntos residenciales: web en React/Next.js, backend en Go y PostgreSQL, y apps en Flutter para residentes y personal. Integré JEV en el asistente de ayuda para que las personas pregunten en lenguaje natural y reciban una respuesta del centro de ayuda.",
    },
    operated: {
      en: "Side project, built with a co-founder. Two apps published on both stores.",
      es: "Proyecto paralelo, construido con un cofundador. Dos apps publicadas en ambas tiendas.",
    },
    stack: ["Next.js", "Flutter", "Go", "PostgreSQL"],
    apps: [
      {
        name: { en: "iHabitar for residents", es: "iHabitar para residentes" },
        appStore: "https://apps.apple.com/co/app/ihabitar/id6741701093",
        googlePlay: "https://play.google.com/store/apps/details?id=com.innovafour.ihabitar",
      },
      {
        name: { en: "iHabitar Staff", es: "iHabitar Staff" },
        appStore: "https://apps.apple.com/co/app/ihabitar-staff/id6741703507",
        googlePlay: "https://play.google.com/store/apps/details?id=com.innovafour.ihabitar_staff",
      },
    ],
  },
  {
    name: "Bocan Contracting",
    domain: "bocancontracting.ca",
    url: "https://www.bocancontracting.ca/",
    image: "/projects/bocan/hero-construction.jpg",
    logo: "/projects/bocan/logo.png",
    sector: { en: "Construction, Canada and Colombia", es: "Construcción, Canadá y Colombia" },
    summary: {
      en: "Bilingual site for a contracting firm with 25+ years of work: tabs per division, a before/after slider with lightbox, and a gallery made from real job sites.",
      es: "Sitio bilingüe para una constructora con más de 25 años: pestañas por división, slider antes/después con lightbox y una galería hecha con obras reales.",
    },
    operated: {
      en: "Deployed on Vercel.",
      es: "Desplegado en Vercel.",
    },
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    name: "Casa Vida",
    domain: "casavidactg.com",
    url: "https://casavidactg.com/",
    image: "/projects/casa-vida/real-worship.jpg",
    logo: "/projects/casa-vida/logo.png",
    sector: { en: "Church, Cartagena", es: "Iglesia, Cartagena" },
    summary: {
      en: "Public site plus an admin panel with real roles (admin, pastor, servant), an appointment calendar and a separate dynamic form builder.",
      es: "Sitio público más un panel de administración con roles reales (admin, pastor, servidor), calendario de citas y un constructor de formularios dinámicos aparte.",
    },
    operated: {
      en: "Both apps share one Postgres on a single droplet, deployed with Docker Compose and GitHub Actions.",
      es: "Ambas apps comparten un Postgres en un solo droplet, con despliegue por Docker Compose y GitHub Actions.",
    },
    stack: ["Next.js", "PostgreSQL", "Docker", "GitHub Actions"],
  },
  {
    name: "Reformar IPS",
    domain: "reformaripsfundacion.co",
    url: "https://www.reformaripsfundacion.co/",
    image: "/projects/reformar-ips/site.jpg",
    logo: "/projects/reformar-ips/logo.png",
    sector: { en: "Healthcare, Bolívar", es: "Salud, Bolívar" },
    summary: {
      en: "Health foundation site rebuilt as a static export for FTP-only hosting. I ported 11 API routes to PHP so the appointment integration keeps working without a Node server.",
      es: "Sitio de una fundación de salud reconstruido como export estático para un hosting solo FTP. Migré 11 endpoints a PHP para que la integración de citas siga funcionando sin servidor Node.",
    },
    operated: {
      en: "Static export on FTP-only hosting, deployed with GitHub Actions.",
      es: "Export estático en hosting solo FTP, desplegado con GitHub Actions.",
    },
    stack: ["Next.js", "PHP", "GitHub Actions", "Tailscale"],
  },
  {
    name: "Grupo La Fe",
    domain: "grupolafecartagena.org",
    url: "https://www.grupolafecartagena.org/",
    logo: "/projects/grupo-la-fe/logo.png",
    sector: { en: "Gambling recovery support, Cartagena", es: "Apoyo en recuperación de ludopatía, Cartagena" },
    summary: {
      en: "Site for an anonymous support group. No photos of real attendees, by design: anonymity comes first.",
      es: "Sitio para un grupo de apoyo anónimo. Sin fotos de asistentes, por diseño: el anonimato va primero.",
    },
    operated: {
      en: "Runs behind a shared Caddy reverse proxy next to this portfolio, with automatic HTTPS.",
      es: "Corre detrás de un Caddy compartido junto a este portafolio, con HTTPS automático.",
    },
    stack: ["Next.js", "Docker", "Caddy"],
  },
]

export const otherBuilds: { name: string; url: string; summary: Localized }[] = [
  {
    name: "iforevents",
    url: "https://iforevents.com/",
    summary: {
      en: "Event tracking and analytics API in Go with ClickHouse, Redis and RabbitMQ. Self-hosted with Docker.",
      es: "API de tracking y analítica de eventos en Go con ClickHouse, Redis y RabbitMQ. Self-hosted con Docker.",
    },
  },
  {
    name: "What to do Cartagena",
    url: "https://whattodocartagena.com/",
    summary: {
      en: "Tourist guide with a Leaflet map, local events and routes.",
      es: "Guía turística con mapa en Leaflet, eventos locales y rutas.",
    },
  },
]

export type Job = {
  role: string
  company: string
  period: Localized
  place: Localized
  start: string
  end: string
  summary: Localized
  stack: string[]
  links: { name: string; url: string }[]
}

export const jobs: Job[] = [
  {
    role: "Full Stack Developer",
    company: "FALP",
    period: { en: "Jun 2023 – Oct 2026", es: "jun 2023 – oct 2026" },
    place: { en: "Santiago, Chile", es: "Santiago, Chile" },
    start: "2023",
    end: "2026",
    summary: {
      en: "Built and maintained the foundation's mobile apps in React Native and Flutter: Mi FALP, for medical services, and EduCancer, for cancer education. Integrated AWS Lambda, Rekognition and Firebase.",
      es: "Construí y mantuve las apps móviles de la fundación en React Native y Flutter: Mi FALP, para servicios médicos, y EduCancer, para educación sobre el cáncer. Integré AWS Lambda, Rekognition y Firebase.",
    },
    stack: ["React Native", "Flutter", "Node.js", "AWS", "Firebase"],
    links: [
      { name: "Mi FALP (Android)", url: "https://play.google.com/store/apps/details?id=com.appFalp&hl=es_CO" },
      { name: "Mi FALP (iOS)", url: "https://apps.apple.com/cl/app/mi-falp/id6460034866" },
      { name: "EduCancer", url: "https://play.google.com/store/apps/details?id=com.educancer&hl=es_CO" },
    ],
  },
  {
    role: "Sr. Mobile Developer",
    company: "DD360",
    period: { en: "Apr 2023 – Oct 2023", es: "abr 2023 – oct 2023" },
    place: { en: "Mexico City", es: "Ciudad de México" },
    start: "2023",
    end: "2023",
    summary: {
      en: "Led the Flutter development of a Monopoly app with Clean Architecture and BLoC, integrating Unity for 3D graphics.",
      es: "Lideré el desarrollo en Flutter de una app de Monopoly con Clean Architecture y BLoC, integrando Unity para los gráficos 3D.",
    },
    stack: ["Flutter", "BLoC", "Unity"],
    links: [{ name: "dd360.mx", url: "https://dd360.mx/" }],
  },
  {
    role: "Sr. Mobile Developer",
    company: "Tul",
    period: { en: "Jul 2022 – Feb 2023", es: "jul 2022 – feb 2023" },
    place: { en: "Bogotá", es: "Bogotá" },
    start: "2022",
    end: "2023",
    summary: {
      en: "Shipped new modules for the TUL Backoffice app in Flutter and BLoC. Typed error handling with Dartz; Firebase and Sentry for analytics and crash tracking.",
      es: "Entregué módulos nuevos para la app TUL Backoffice en Flutter y BLoC. Manejo de errores tipado con Dartz; Firebase y Sentry para analítica y seguimiento de fallos.",
    },
    stack: ["Flutter", "BLoC", "Firebase", "Sentry"],
    links: [{ name: "TUL Backoffice", url: "https://play.google.com/store/apps/details?id=co.com.tul.backoffice&hl=es_CO" }],
  },
  {
    role: "Full Stack Developer",
    company: "Asap507",
    period: { en: "Jul 2021 – Sep 2022", es: "jul 2021 – sep 2022" },
    place: { en: "Panama City", es: "Ciudad de Panamá" },
    start: "2021",
    end: "2022",
    summary: {
      en: "Built the customer and merchant apps in Flutter with Cubit, and a Node.js microservices backend on AWS for image processing and notifications.",
      es: "Construí las apps de clientes y comercios en Flutter con Cubit, y un backend de microservicios en Node.js sobre AWS para procesamiento de imágenes y notificaciones.",
    },
    stack: ["Flutter", "Node.js", "AWS"],
    links: [
      { name: "asap507.com", url: "https://asap507.com/" },
      { name: "ASAP Courier (Android)", url: "https://play.google.com/store/apps/details?id=com.asap.courier&hl=es_CO" },
      { name: "ASAP (iOS)", url: "https://apps.apple.com/es/app/asap/id1113558289" },
    ],
  },
  {
    role: "Mobile Developer",
    company: "Casa Toro",
    period: { en: "Nov 2020 – Jul 2022", es: "nov 2020 – jul 2022" },
    place: { en: "Bogotá", es: "Bogotá" },
    start: "2020",
    end: "2022",
    summary: {
      en: "Developed Bellpi, an app for vehicle management, appointment booking and payments, in React Native with Redux.",
      es: "Desarrollé Bellpi, una app para gestión de vehículos, reserva de citas y pagos, en React Native con Redux.",
    },
    stack: ["React Native", "Redux"],
    links: [{ name: "bellpi.com", url: "https://www.bellpi.com/" }],
  },
  {
    role: "Mobile Developer",
    company: "Smartinfo",
    period: { en: "Nov 2020 – Feb 2021", es: "nov 2020 – feb 2021" },
    place: { en: "Cartagena", es: "Cartagena" },
    start: "2020",
    end: "2021",
    summary: {
      en: "Flutter app (Modular, MobX) for product distribution and a PHP platform for inventory and logistics.",
      es: "App en Flutter (Modular, MobX) para distribución de productos y una plataforma en PHP para inventario y logística.",
    },
    stack: ["Flutter", "MobX", "PHP"],
    links: [],
  },
  {
    role: "Web Programmer",
    company: "Guido Ulloa & Asociados",
    period: { en: "Dec 2018 – Nov 2020", es: "dic 2018 – nov 2020" },
    place: { en: "Cartagena", es: "Cartagena" },
    start: "2018",
    end: "2020",
    summary: {
      en: "Web and mobile work for agency clients: a medical appointment backend in Node.js and MongoDB, Laravel sites and Flutter and React Native apps.",
      es: "Trabajo web y móvil para clientes de la agencia: un backend de citas médicas en Node.js y MongoDB, sitios en Laravel y apps en Flutter y React Native.",
    },
    stack: ["Laravel", "Node.js", "MongoDB", "Flutter"],
    links: [
      { name: "Clínica Medihelp", url: "https://www.clinicamedihelp.com/" },
      { name: "El Getsemanicense", url: "https://elgetsemanicense.com/" },
    ],
  },
]

/** Stack written as sentences; each item is rendered as an inline chip with its logo. */
export type StackLine = { lead: Localized; items: string[]; tail?: Localized }

export const stackLines: StackLine[] = [
  {
    lead: { en: "Mobile apps in", es: "Apps móviles en" },
    items: ["Flutter", "Dart", "React Native"],
    tail: { en: "published to the App Store and Google Play.", es: "publicadas en App Store y Google Play." },
  },
  {
    lead: { en: "Web front ends with", es: "Interfaces web con" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    lead: { en: "Backends and APIs in", es: "Backends y APIs en" },
    items: ["Node.js", "NestJS", "Go", "PHP", "Laravel"],
  },
  {
    lead: { en: "Data in", es: "Datos en" },
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "ClickHouse"],
  },
  {
    lead: { en: "And I run it myself on", es: "Y lo opero yo mismo con" },
    items: ["Docker", "GitHub Actions", "Caddy", "DigitalOcean", "AWS", "Vercel"],
  },
]

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
  /** Live by default. "beta" = public test environment, production not launched yet. */
  status?: "beta"
  role?: Localized
  sector: Localized
  summary: Localized
  operated: Localized
  stack: string[]
  links?: { label: Localized; url: string }[]
  apps?: { name: Localized; appStore: string; googlePlay: string }[]
}

export const projects: Project[] = [
  {
    name: "iHabitar",
    domain: "ihabitar.com",
    url: "https://ihabitar.com/",
    image: "/projects/ihabitar/screenshot.jpg",
    role: { en: "Co-founder. Side project with Innovafour", es: "Cofundador. Proyecto paralelo con Innovafour" },
    sector: { en: "Residential property management", es: "Gestión de conjuntos residenciales" },
    summary: {
      en: "A platform for residential complexes: a React/Next.js web app, a Go and PostgreSQL backend, and Flutter apps for residents and staff. I integrated JEV into the help assistant so people can ask questions in plain language and get an answer from the help center.",
      es: "Plataforma para conjuntos residenciales: web en React/Next.js, backend en Go y PostgreSQL, y apps en Flutter para residentes y personal. Integré JEV en el asistente de ayuda para que las personas pregunten en lenguaje natural y reciban una respuesta del centro de ayuda.",
    },
    operated: {
      en: "Built and run by Innovafour. Images go to GHCR and deploy over Tailscale to our droplet: main to production, develop to the dev environment. Two apps on both stores.",
      es: "Construido y operado por Innovafour. Las imágenes van a GHCR y se despliegan por Tailscale a nuestro droplet: main a producción, develop a desarrollo. Dos apps en ambas tiendas.",
    },
    stack: ["Next.js", "Astro", "Flutter", "Go", "PostgreSQL", "Redis", "RabbitMQ"],
    links: [{ label: { en: "Guest access", es: "Acceso de invitados" }, url: "https://guest.ihabitar.com/" }],
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
    name: "Reserday",
    domain: "reserday.dev",
    url: "https://reserday.dev/",
    image: "/projects/reserday/screenshot.jpg",
    status: "beta",
    role: { en: "Side project with Innovafour", es: "Proyecto paralelo con Innovafour" },
    sector: { en: "Island day trips, Cartagena", es: "Pasadías a las islas, Cartagena" },
    summary: {
      en: "Booking and payments for day trips to the islands of Cartagena. Agencies, promoters and operators sell through it; every booking gets its own payment link and a boarding QR.",
      es: "Reservas y pagos de pasadías a las islas de Cartagena. Agencias, promotores y operadores venden con ella; cada reserva tiene su propio link de pago y su QR de abordaje.",
    },
    operated: {
      en: "Public test environment while production launches. Go API behind KrakenD, Flutter app and admin, Wompi payments, deployed to the Innovafour droplet.",
      es: "Entorno de pruebas público mientras sale producción. API en Go detrás de KrakenD, app y admin en Flutter, pagos con Wompi, desplegado en el droplet de Innovafour.",
    },
    stack: ["Next.js", "Go", "Flutter", "PostgreSQL"],
  },
  {
    name: "Introduce",
    domain: "introducechurch.com",
    url: "https://introducechurch.com/",
    image: "/projects/introduce/screenshot.jpg",
    sector: { en: "Free projection software for churches", es: "Software de proyección gratis para iglesias" },
    summary: {
      en: "Desktop app for projecting lyrics, Bible verses, announcements and videos on the church screen from a single window, for Mac and Windows.",
      es: "App de escritorio para proyectar letras, versículos, avisos y videos en la pantalla de la iglesia desde una sola ventana, para Mac y Windows.",
    },
    operated: {
      en: "Releases published on GitHub. The website and the Go API run on a droplet.",
      es: "Las versiones se publican en GitHub. La web y la API en Go corren en un droplet.",
    },
    stack: ["Flutter", "Go", "PostgreSQL", "Docker"],
  },
  {
    name: "Casa Vida",
    domain: "casavidactg.com",
    url: "https://casavidactg.com/",
    image: "/projects/casa-vida/screenshot.jpg",
    logo: "/projects/casa-vida/logo.png",
    sector: { en: "Church, Cartagena", es: "Iglesia, Cartagena" },
    summary: {
      en: "Public site plus an admin panel with real roles (admin, pastor, servant), an appointment calendar and a separate dynamic form builder.",
      es: "Sitio público más un panel de administración con roles reales (admin, pastor, servidor), calendario de citas y un constructor de formularios dinámicos aparte.",
    },
    operated: {
      en: "Both apps share one Postgres 16 on a single droplet, behind the shared Caddy, deployed with GitHub Actions and Docker Compose.",
      es: "Ambas apps comparten un Postgres 16 en un solo droplet, detrás del Caddy compartido, con despliegue por GitHub Actions y Docker Compose.",
    },
    stack: ["Next.js", "Drizzle", "PostgreSQL", "Resend", "Docker"],
    links: [{ label: { en: "Form builder", es: "Constructor de formularios" }, url: "https://form.casavidactg.com/" }],
  },
  {
    name: "Reformar IPS",
    domain: "reformaripsfundacion.co",
    url: "https://www.reformaripsfundacion.co/",
    image: "/projects/reformar-ips/screenshot.jpg",
    logo: "/projects/reformar-ips/logo.png",
    sector: { en: "Healthcare, Bolívar", es: "Salud, Bolívar" },
    summary: {
      en: "Health foundation site rebuilt as a static export for FTP-only hosting. I ported 11 API routes to PHP so the appointment integration keeps working without a Node server.",
      es: "Sitio de una fundación de salud reconstruido como export estático para un hosting solo FTP. Migré 11 endpoints a PHP para que la integración de citas siga funcionando sin servidor Node.",
    },
    operated: {
      en: "Static export on FTP-only hosting, deployed with GitHub Actions. A small PHP proxy keeps the appointments API token on the server.",
      es: "Export estático en hosting solo FTP, desplegado con GitHub Actions. Un pequeño proxy en PHP mantiene el token de la API de citas en el servidor.",
    },
    stack: ["Next.js", "PHP", "GitHub Actions"],
  },
  {
    name: "What to do Cartagena",
    domain: "whattodocartagena.com",
    url: "https://whattodocartagena.com/",
    image: "/projects/whattodo/screenshot.jpg",
    sector: { en: "Tourist guide, Cartagena", es: "Guía turística, Cartagena" },
    summary: {
      en: "An interactive guide to Cartagena de Indias: events, local businesses, tourist routes and history, with a map and installable as a PWA.",
      es: "Guía interactiva de Cartagena de Indias: eventos, comercios, rutas turísticas e historia, con mapa e instalable como PWA.",
    },
    operated: {
      en: "Front end and Go API deployed to my droplet with GHCR and GitHub Actions.",
      es: "Frontend y API en Go desplegados en mi droplet con GHCR y GitHub Actions.",
    },
    stack: ["Next.js", "Go", "PostgreSQL", "PWA"],
  },
  {
    name: "Grupo La Fe",
    domain: "grupolafecartagena.org",
    url: "https://www.grupolafecartagena.org/",
    image: "/projects/grupo-la-fe/screenshot.jpg",
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
    name: "IForevents",
    url: "https://iforevents.com/",
    summary: {
      en: "Side project with Innovafour: self-hosted product analytics, installed with one Docker command. I contributed to the dashboard.",
      es: "Proyecto paralelo con Innovafour: analítica de producto self-hosted, se instala con un comando de Docker. Contribuí en el dashboard.",
    },
  },
  {
    name: "Innovafour",
    url: "https://innovafour.com/",
    summary: {
      en: "The software company I'm a partner in, as a side project. It's home to iHabitar, Reserday and IForevents.",
      es: "La empresa de software de la que soy socio, como proyecto paralelo. Ahí viven iHabitar, Reserday e IForevents.",
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

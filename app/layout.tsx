import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/theme-provider"; 
import "./globals.css";

const SITE_URL = "https://stevenpatino.dev";
const SITE_TITLE = "Steven Patiño Urquijo — Systems Engineer & Full Stack Developer";
const SITE_DESCRIPTION =
  "Full Stack Developer & Systems Engineer with 8+ years of experience. I build and operate production sites and infrastructure (Next.js, Docker, CI/CD) for real clients in construction, healthcare, and community organizations. Co-founder of iHabitar, a side project for residential property management.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Steven Patiño",
    "Software Developer",
    "Full Stack Developer",
    "Systems Engineer",
    "Flutter Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "DevOps",
    "Mobile Developer",
    "Web Developer freelance Colombia",
    "Cartagena",
  ],
  authors: [{ name: "Steven Patiño Urquijo", url: SITE_URL }],
  creator: "Steven Patiño Urquijo",
  publisher: "Steven Patiño Urquijo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: SITE_URL,
    siteName: "Steven Patiño Urquijo — Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  category: "technology",
};

// One family, used actively: Archivo's width axis (62–125) carries the display voice.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1220" },
  ],
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Steven Patiño Urquijo",
              jobTitle: "Systems Engineer & Full Stack Developer",
              description: SITE_DESCRIPTION,
              url: SITE_URL,
              sameAs: [
                "https://www.linkedin.com/in/steven-p-0ab502126/",
                "https://github.com/steven230500",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cartagena",
                addressCountry: "Colombia",
              },
              email: "steven230500@outlook.com",
              telephone: "+57 3022908439",
              nationality: "Colombian",
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Universidad Nacional Abierta y a Distancia UNAD",
              },
              knowsAbout: [
                "Flutter",
                "React",
                "Next.js",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "React Native",
                "AWS",
                "Firebase",
                "Mobile Development",
                "Web Development",
                "Full Stack Development",
                "Docker",
                "CI/CD",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

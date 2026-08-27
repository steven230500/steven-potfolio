import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/theme-provider"; 
import { Suspense } from "react";
import "./globals.css";
import Script from "next/script";

const SITE_URL = "https://stevenpatino.dev";
const SITE_TITLE = "Steven Patiño Urquijo — Systems Engineer & Full Stack Developer";
const SITE_DESCRIPTION =
  "Full Stack Developer & Systems Engineer with 7+ years of experience. I build and operate production sites and infrastructure (Next.js, Docker, CI/CD) for real clients in construction, healthcare, and community organizations. Co-founder at iHabitar.";

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
    languages: {
      en: SITE_URL,
      es: SITE_URL,
    },
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

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600", "700"],
});

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans} ${geistMono} ${spaceGrotesk.variable} antialiased`}
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
              birthDate: "2000-05-23",
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
              worksFor: {
                "@type": "Organization",
                name: "iHabitar",
                url: "https://ihabitar.com",
              },
            }),
          }}
        />
        <meta name="theme-color" content="#0b0e14" />
      </head>
      <body className="min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              forcedTheme="dark"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </Suspense>
        {/* <Analytics /> */}
        <Script
          id="recaptcha"
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </body>
    </html>
  );
}

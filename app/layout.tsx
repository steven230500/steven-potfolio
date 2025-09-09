import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/theme-provider"; // ✅ usa tu wrapper
import { Suspense } from "react";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Steven Patiño Urquijo - Sr. Software Developer & Systems Engineer",
  description:
    "Full Stack Developer with 5+ years of experience building mobile, web, and backend solutions. Specialist in Flutter, React, Next.js, and Node.js. Co-founder at iHabitar.",
  keywords: [
    "Steven Patiño",
    "Software Developer",
    "Full Stack Developer",
    "Flutter Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Systems Engineer",
    "Mobile Developer",
    "Web Developer",
    "Colombia",
    "Cartagena",
  ],
  authors: [{ name: "Steven Patiño Urquijo" }],
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://stevenpatino.dev",
    siteName: "Steven Patiño Urquijo - Portfolio",
    title: "Steven Patiño Urquijo - Sr. Software Developer & Systems Engineer",
    description:
      "Full Stack Developer with 5+ years of experience building mobile, web, and backend solutions. Specialist in Flutter, React, Next.js, and Node.js.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Steven Patiño Urquijo - Sr. Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steven Patiño Urquijo - Sr. Software Developer & Systems Engineer",
    description:
      "Full Stack Developer with 5+ years of experience building mobile, web, and backend solutions.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  generator: "v0.app",
};

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans} ${geistMono} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Steven Patiño Urquijo",
              jobTitle: "Sr. Software Developer",
              description:
                "Full Stack Developer with 5+ years of experience building mobile, web, and backend solutions. Specialist in Flutter, React, Next.js, and Node.js.",
              url: "https://stevenpatino.dev",
              sameAs: [
                "https://linkedin.com/in/stevenpatino",
                "https://github.com/stevenpatino",
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
              ],
              worksFor: {
                "@type": "Organization",
                name: "iHabitar",
                url: "https://ihabitar.com",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://stevenpatino.dev" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
        <Script
          id="recaptcha"
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </body>
    </html>
  );
}

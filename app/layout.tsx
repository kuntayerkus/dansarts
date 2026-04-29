import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "DANS ARTS · Sahnemiz Her Yer. Her Akşam Yeniden. — Reyhan Şafak · İzmir",
  description:
    "Türkiye Dans Sporları Federasyonu tescilli 2. Kademe Antrenör Reyhan Şafak öncülüğünde, İzmir'in lüks otellerinde ve butik mekanlarında yaşanan davete açık dans deneyimi. 1995'ten bu yana, 32 yıllık tecrübe.",
  keywords: [
    "Dans Arts",
    "Reyhan Şafak",
    "İzmir dans",
    "Latin dans",
    "Arjantin Tango",
    "Salsa",
    "Bachata",
    "Sportif Latin",
    "Ballroom",
    "TDSF",
    "Düğün dansı",
    "Wedding choreography",
    "Boutique workshop",
    "Wine night",
  ],
  authors: [{ name: "Reyhan Şafak" }],
  creator: "Dans Arts",
  publisher: "Dans Arts · İzmir",
  metadataBase: new URL("https://dansarts.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "DANS ARTS · Sahnemiz Her Yer. Her Akşam Yeniden.",
    description:
      "Reyhan Şafak imzasıyla, İzmir'in seçkin sahnelerinde butik dans deneyimi. 1995'ten bu yana.",
    type: "website",
    locale: "tr_TR",
    siteName: "Dans Arts",
  },
  twitter: {
    card: "summary_large_image",
    title: "DANS ARTS · Sahnemiz Her Yer. Her Akşam Yeniden.",
    description:
      "Reyhan Şafak imzasıyla İzmir'in seçkin sahnelerinde butik dans deneyimi.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// JSON-LD structured data — gives Google enough context to render rich
// brand/person panels and stitch Dans Arts into the Knowledge Graph as a
// professional service rather than a generic listing.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dansarts.com/#organization",
      name: "Dans Arts",
      alternateName: "DANS ARTS",
      description:
        "Reyhan Şafak imzasıyla, İzmir'in seçkin sahnelerinde davete açık butik dans deneyimi. Sportif Latin, Ballroom ve Sosyal Danslar.",
      url: "https://dansarts.com",
      logo: "https://dansarts.com/icon.svg",
      image: "https://dansarts.com/opengraph-image",
      slogan: "Sahnemiz Her Yer. Her Akşam Yeniden.",
      foundingDate: "1995",
      founder: { "@id": "https://dansarts.com/#reyhan" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "İzmir",
        addressCountry: "TR",
      },
      areaServed: { "@type": "City", name: "İzmir" },
      sameAs: ["https://instagram.com/dansartsreyhan"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "dansartsreyhan@gmail.com",
        availableLanguage: ["Turkish", "English"],
      },
    },
    {
      "@type": "Person",
      "@id": "https://dansarts.com/#reyhan",
      name: "Reyhan Şafak",
      jobTitle: "Kurucu & Baş Eğitmen · TDSF 2. Kademe Antrenör",
      gender: "Female",
      nationality: "Turkish",
      worksFor: { "@id": "https://dansarts.com/#organization" },
      alumniOf: [
        { "@type": "Organization", name: "Avalon School · Crawley" },
        { "@type": "Organization", name: "The English Academy · Crawley" },
        { "@type": "Organization", name: "Ege Konservatuarı · İzmir" },
        { "@type": "Organization", name: "Anadolu Üniversitesi" },
      ],
      hasCredential: [
        "TDSF 2. Kademe Antrenörlük Belgesi",
        "TDSF Türkiye 1.liği · 2008",
      ],
      knowsAbout: [
        "Sportif Latin",
        "Ballroom",
        "Arjantin Tango",
        "Salsa",
        "Bachata",
        "Düğün koreografisi",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dansarts.com/#website",
      url: "https://dansarts.com",
      name: "Dans Arts",
      inLanguage: "tr-TR",
      publisher: { "@id": "https://dansarts.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Single, minified JSON; React strips whitespace anyway. Safe content
          // (no user input) so JSON.stringify is sufficient — no escaping needed.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text antialiased overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

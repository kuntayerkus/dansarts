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
  title: "DANS ARTS · Stüdyomuz Yok. Sahnemiz Var. — Reyhan Şafak · İzmir",
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
    title: "DANS ARTS · Stüdyomuz Yok. Sahnemiz Var.",
    description:
      "Reyhan Şafak imzasıyla, İzmir'in seçkin sahnelerinde butik dans deneyimi. 1995'ten bu yana.",
    type: "website",
    locale: "tr_TR",
    siteName: "Dans Arts",
  },
  twitter: {
    card: "summary_large_image",
    title: "DANS ARTS · Stüdyomuz Yok. Sahnemiz Var.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-background text-text antialiased overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

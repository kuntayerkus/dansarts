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
  title: "DANS ARTS · Reyhan Şafak — Hareketin En Asil Hali",
  description:
    "İzmir merkezli, Reyhan Şafak öncülüğünde Latin danslarının zarafetini sahnede yeniden yorumlayan eksklüzif bir atölye.",
  metadataBase: new URL("https://dansarts.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "DANS ARTS · Reyhan Şafak",
    description: "Hareketin En Asil Hali. İzmir'in eksklüzif Latin dans evi.",
    type: "website",
    locale: "tr_TR",
    siteName: "Dans Arts",
  },
  twitter: {
    card: "summary_large_image",
    title: "DANS ARTS · Reyhan Şafak",
    description: "Hareketin En Asil Hali. İzmir'in eksklüzif Latin dans evi.",
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

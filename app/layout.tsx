import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BUSINESS, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "DentLabNZ | Paintless Dent Removal Specialists in New Zealand";
const DESCRIPTION =
  "DentLabNZ are New Zealand's paintless dent removal specialists. We fix door dings, hail damage and panel dents without repainting, preserving your factory finish and vehicle value. Fast, affordable, expert PDR across NZ.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | DentLabNZ",
  },
  description: DESCRIPTION,
  applicationName: BUSINESS.name,
  keywords: [
    "paintless dent removal NZ",
    "PDR specialist New Zealand",
    "car dent repair NZ",
    "hail damage repair NZ",
    "door ding repair",
    "paintless dent repair cost NZ",
    "dent removal specialist Auckland",
    "dent removal Hamilton",
    "vehicle dent repair NZ",
    "mobile dent removal NZ",
    "panel dent repair without painting",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DentLabNZ | Paintless Dent Removal Specialists",
    description:
      "Expert paintless dent removal across New Zealand. No repainting, no filler, just precision repairs that preserve your factory finish and vehicle value.",
    url: SITE_URL,
    siteName: BUSINESS.name,
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DentLabNZ: Paintless Dent Removal Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DentLabNZ | Paintless Dent Removal Specialists",
    description:
      "Expert paintless dent removal across New Zealand. No repainting, no filler, just precision repairs.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: BUSINESS.name,
              description:
                "Paintless dent removal specialists in New Zealand. Expert PDR for door dings, hail damage and panel dents.",
              url: SITE_URL,
              "@id": `${SITE_URL}/#business`,
              image: `${SITE_URL}/opengraph-image`,
              email: BUSINESS.email,
              telephone: BUSINESS.phone,
              sameAs: [BUSINESS.instagram],
              currenciesAccepted: "NZD",
              areaServed: [
                { "@type": "Country", name: "New Zealand" },
                ...BUSINESS.areasServed.map((name) => ({
                  "@type": "City",
                  name,
                })),
              ],
              serviceType: "Paintless Dent Removal",
              priceRange: BUSINESS.priceRange,
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "PDR Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Door Ding & Parking Dent Repair",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hail Damage Repair",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Panel Dent & Crease Repair",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Garage Door Dent Repair",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

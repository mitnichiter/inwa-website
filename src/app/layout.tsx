import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "INWA | Halwa Reimagined",
    template: "%s | INWA",
  },
  description: "Premium artisanal halwa for the modern palate. Experience the perfect fusion of tradition and luxury.",
  keywords: ["halwa", "calicut halwa", "sweets", "dessert", "premium sweets", "luxury confectionery"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inwa-website.vercel.app",
    siteName: "INWA",
    title: "INWA | Halwa Reimagined",
    description: "Premium artisanal halwa for the modern palate.",
    images: [
      {
        url: "/og-image.jpg", // Assuming an OG image exists or will be added, otherwise falls back to logo usually or needs specific setup
        width: 1200,
        height: 630,
        alt: "INWA Halwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INWA | Halwa Reimagined",
    description: "Premium artisanal halwa for the modern palate.",
    // images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/inwalogo.png" },
      { url: "/inwalogo.png", type: "image/png" },
    ],
    shortcut: "/inwalogo.png",
    apple: "/inwalogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased font-sans bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "INWA",
              url: "https://inwa-website.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://inwa-website.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

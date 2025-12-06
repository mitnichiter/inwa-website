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
  title: "INWA | Halwa Reimagined",
  description: "Premium artisanal halwa for the modern palate.",
  icons: {
    icon: "/inwalogo.png",
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
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

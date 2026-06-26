import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmAi — AI Data Automation Platform",
  description: "Automate your data pipelines with next-generation AI. AmAi processes millions of events in real-time with zero infrastructure overhead.",
  keywords: ["AI automation", "data pipeline", "machine learning platform", "real-time data", "AI SaaS"],
  authors: [{ name: "AmAi" }],
  robots: "index, follow",
  metadataBase: new URL("https://amai.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://amai.vercel.app",
    title: "AmAi — AI Data Automation Platform",
    description: "Automate your data pipelines with next-generation AI. AmAi processes millions of events in real-time with zero infrastructure overhead.",
    siteName: "AmAi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AmAi Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmAi — AI Data Automation Platform",
    description: "Automate your data pipelines with next-generation AI.",
    images: ["/og-image.png"],
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

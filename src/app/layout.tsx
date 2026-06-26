import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuralFlow — AI Data Automation Platform",
  description:
    "Automate your data pipelines with next-generation AI. NeuralFlow processes millions of events in real-time with zero infrastructure overhead.",
  keywords: ["AI automation", "data pipeline", "machine learning platform", "real-time data", "AI SaaS"],
  authors: [{ name: "NeuralFlow" }],
  robots: "index, follow",
  metadataBase: new URL("https://neuralflow.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://neuralflow.vercel.app",
    title: "NeuralFlow — AI Data Automation Platform",
    description:
      "Automate your data pipelines with next-generation AI. NeuralFlow processes millions of events in real-time with zero infrastructure overhead.",
    siteName: "NeuralFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NeuralFlow Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralFlow — AI Data Automation Platform",
    description:
      "Automate your data pipelines with next-generation AI. NeuralFlow processes millions of events in real-time with zero infrastructure overhead.",
    images: ["/og-image.png"],
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
import { Outfit, Kaushan_Script } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roadtrip | Discover Extraordinary Journeys",
  description:
    "Curated tours, bespoke travel expeditions, work abroad employment in Japan, and global language exchange programs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${kaushanScript.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white text-brand-ink font-sans flex flex-col selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}

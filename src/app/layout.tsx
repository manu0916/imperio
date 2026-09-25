import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { SiteShell } from "@/components/layout/site-shell";
import { PageTransition } from "@/components/ui/page-transition";
import { ShopProvider } from "@/context/shop-context";
import { brandConfig } from "@/config/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.CF_PAGES_URL ??
      "http://localhost:3000",
  ),
  title: {
    default: `${brandConfig.name} — Streetwear contemporâneo`,
    template: `%s | ${brandConfig.name}`,
  },
  description:
    "Moda contemporânea de linguagem underground. Drops limitados, essenciais urbanos e curadoria autoral.",
  keywords: ["streetwear", "moda contemporânea", "roupas", "drop", "loja online"],
  openGraph: {
    title: `${brandConfig.name} — Streetwear contemporâneo`,
    description: "Drops limitados, essenciais urbanos e curadoria autoral.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo
        </a>
        <ShopProvider>
          <div className="flex min-h-svh flex-col overflow-x-clip">
            <SiteShell />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}

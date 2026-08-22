import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import { siteConfig, SITE_URL, activeSocials } from "@/config/site";
import "./globals.css";

const fontBebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const fontCormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fontIbmPlex = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
});

const titleDefault = `${siteConfig.name} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: titleDefault,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: SITE_URL }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: titleDefault,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.description,
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
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

/** Person structured data — helps search engines & rich results. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: SITE_URL,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  ...(activeSocials.length > 0 && { sameAs: activeSocials.map((s) => s.href) }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBebas.variable} ${fontCormorant.variable} ${fontInter.variable} ${fontIbmPlex.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

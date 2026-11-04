import { contact } from "@content/contact.ts";
import { education } from "@content/education.ts";
import { site } from "@content/site.ts";
import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { ShellScripts } from "@/components/shell/ShellScripts";
import { SiteNav } from "@/components/shell/SiteNav";
import { Lightbox } from "@/components/Lightbox";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: site.seo.home.title, template: `%s — ${site.name}` },
  description: site.seo.home.description,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", siteName: site.name, title: site.seo.home.title, description: site.seo.home.description, url: "/" },
  twitter: { card: "summary", title: site.seo.home.title, description: site.seo.home.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2b231d" },
    { media: "(prefers-color-scheme: dark)", color: "#2b231d" },
  ],
};

// Before first paint: appearance (stored choice, else system) and the career filter.
const BEFORE_PAINT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}d.dataset.theme=t;var f=localStorage.getItem('filter');if(f==='planning'||f==='business')d.dataset.filter=f}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.positioning,
  url: site.domain,
  email: `mailto:${contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  worksFor: { "@type": "Organization", name: "Innotec Engineering Services" },
  sameAs: [contact.linkedin, contact.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${display.variable}`} data-filter="all" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="app" id="top">
          <SiteNav />
          {children}
          <Footer />
        </div>
        <ShellScripts />
        <Lightbox />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}

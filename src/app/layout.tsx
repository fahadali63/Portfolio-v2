import { contact } from "@content/contact.ts";
import { education } from "@content/education.ts";
import { site } from "@content/site.ts";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { projects } from "@content/index.ts";
import { Footer } from "@/components/Footer";
import { ShellScripts } from "@/components/shell/ShellScripts";
import { CommandPalette, type Command } from "@/components/shell/CommandPalette";
import { nav } from "@/components/shell/nav";
import { Sidebar } from "@/components/shell/Sidebar";
import { splitTitle } from "@/lib/format";
import { Lightbox } from "@/components/Lightbox";
import "./globals.css";
import "./glass.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

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
    { media: "(prefers-color-scheme: light)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Before first paint: appearance (stored choice, else dark) and a flag that scripts run (scroll reveals wait for it).
const BEFORE_PAINT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}d.dataset.theme=t}catch(e){d.dataset.theme='dark'}})()`;

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

/** Everything the quick-actions modal can do, in the order people need it. */
const commands: Command[] = [
  ...nav.flatMap((g) =>
    g.items.map((i): Command => ({
      id: `go-${i.href}`,
      group: g.track ? g.label : "Pages",
      label: g.track ? `${g.label}: ${i.label}` : i.label,
      hint: i.hint,
      icon: i.icon,
      href: i.href,
    })),
  ),
  ...contact.resumes.map((r): Command => ({
    id: `resume-${r.track}`,
    group: "Actions",
    label: `Download ${r.label}`,
    hint: "PDF",
    keywords: "resume cv download pdf",
    icon: "download",
    href: r.file,
    download: r.download,
  })),
  { id: "copy-email", group: "Actions", label: "Copy email address", hint: contact.email, keywords: "mail contact", icon: "copy", copy: contact.email },
  { id: "send-email", group: "Actions", label: "Write an email", keywords: "mail contact hire", icon: "mail", href: `mailto:${contact.email}` },
  { id: "linkedin", group: "Actions", label: "Open LinkedIn", keywords: "profile social", icon: "external", href: contact.linkedin, external: true },
  { id: "whatsapp", group: "Actions", label: "Message on WhatsApp", keywords: "phone chat", icon: "chat", href: contact.whatsapp, external: true },
  { id: "theme", group: "Actions", label: "Switch light / dark appearance", keywords: "theme mode", icon: "theme", theme: true },
  ...projects.map((p): Command => ({
    id: `project-${p.slug}`,
    group: "Planning projects",
    label: splitTitle(p.title)[0],
    hint: p.category,
    keywords: `${p.title} ${p.location ?? ""} ${p.tools.join(" ")}`,
    icon: "file",
    href: `/work/${p.slug}`,
  })),
];

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
        <div className="backdrop" aria-hidden="true">
          <span className="backdrop__glow backdrop__glow--a" />
          <span className="backdrop__glow backdrop__glow--b" />
          <span className="backdrop__glow backdrop__glow--c" />
          <span className="backdrop__grid" />
        </div>
        <div className="app" id="top">
          <Sidebar />
          <div className="app__main">
            {children}
            <Footer />
          </div>
        </div>
        <CommandPalette commands={commands} />
        <ShellScripts />
        <Lightbox />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}

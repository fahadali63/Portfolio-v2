import { contact } from "@content/contact.ts";
import { education } from "@content/education.ts";
import { site } from "@content/site.ts";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { projects } from "@content/index.ts";
import { Footer } from "@/components/Footer";
import { ShellScripts } from "@/components/shell/ShellScripts";
import { CommandPalette, type Command } from "@/components/shell/CommandPalette";
import { nav } from "@/components/shell/nav";
import { Sidebar } from "@/components/shell/Sidebar";
import { splitTitle } from "@/lib/format";
import { Lightbox } from "@/components/Lightbox";
import "./site.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

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
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

// Before first paint: the stored appearance, else the system's. Paper (light) is the default look.
const BEFORE_PAINT = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})()`;

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
      label: g.track ? `${i.label}, ${g.label.toLowerCase()}` : i.label,
      hint: i.code,
      keywords: i.hint,
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
  { id: "theme", group: "Actions", label: "Switch light or dark appearance", keywords: "theme mode", icon: "theme", theme: true },
  ...projects.map((p): Command => ({
    id: `project-${p.slug}`,
    group: "Planning projects",
    label: splitTitle(p.title)[0],
    hint: p.category,
    keywords: `P-02 ${p.title} ${p.location ?? ""} ${p.tools.join(" ")}`,
    icon: "file",
    href: `/work/${p.slug}`,
  })),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
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

// Site structure, numbered like a drawing set: G = general sheets, P = urban planning, B = business
// development. The code is the site's signature: it appears in the menu, on each page's title block and
// in quick search. Groups follow the order a recruiter works in: who is this, then the career they are
// hiring for (overview, then proof, then credentials), then everything else.
export type NavIcon = "home" | "user" | "compass" | "map" | "book" | "award" | "briefcase" | "chart" | "handshake" | "building" | "mail" | "timeline";
export type NavLeaf = { href: string; label: string; icon: NavIcon; code: string; hint?: string };
export type NavGroup = { id: string; label: string; track?: "planning" | "business"; items: NavLeaf[] };

export const nav: NavGroup[] = [
  {
    id: "start",
    label: "General",
    items: [
      { href: "/", label: "Home", icon: "home", code: "G-01", hint: "Choose a career" },
      { href: "/about", label: "About", icon: "user", code: "G-02", hint: "Who Fahad is" },
    ],
  },
  {
    id: "planning",
    label: "Urban planning",
    track: "planning",
    items: [
      { href: "/planning", label: "Overview", icon: "compass", code: "P-01", hint: "Profile, experience, résumé" },
      { href: "/portfolio", label: "Portfolio", icon: "map", code: "P-02", hint: "Master plans, GIS, CAD" },
      { href: "/research", label: "Research", icon: "book", code: "P-03", hint: "Coursework reports" },
      { href: "/certificates", label: "Certificates", icon: "award", code: "P-04", hint: "Letters and awards" },
    ],
  },
  {
    id: "business",
    label: "Business development",
    track: "business",
    items: [
      { href: "/business", label: "Overview", icon: "briefcase", code: "B-01", hint: "Profile, experience, résumé" },
      { href: "/results", label: "Results", icon: "chart", code: "B-02", hint: "Revenue against target" },
      { href: "/engagements", label: "Engagements", icon: "handshake", code: "B-03", hint: "Wins sourced and closed" },
    ],
  },
  {
    id: "more",
    label: "More",
    items: [
      { href: "/experience", label: "All experience", icon: "timeline", code: "G-03", hint: "Both careers, one list" },
      { href: "/worked-with", label: "Worked with", icon: "building", code: "G-04", hint: "Organisations and links" },
      { href: "/contact", label: "Contact", icon: "mail", code: "G-05", hint: "Email, phone, LinkedIn" },
    ],
  },
];

export const sheetFor = (href: string) => {
  for (const g of nav) for (const i of g.items) if (i.href === href) return { ...i, group: g };
  throw new Error(`No sheet for ${href} in nav.ts`);
};

/** Pages that belong to a group without being in the menu (project pages). */
export const groupForPath = (path: string): string | undefined => {
  if (path.startsWith("/work/")) return "planning";
  return nav.find((g) => g.items.some((i) => i.href === path))?.id;
};

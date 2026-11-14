// Site structure. Groups follow the order a recruiter works in: who is this → the career they are
// hiring for (overview first, then proof, then credentials) → anything else.
export type NavIcon = "home" | "user" | "compass" | "map" | "book" | "award" | "briefcase" | "chart" | "handshake" | "building" | "mail";
export type NavLeaf = { href: string; label: string; icon: NavIcon; hint?: string };
export type NavGroup = { id: string; label: string; track?: "planning" | "business"; items: NavLeaf[] };

export const nav: NavGroup[] = [
  {
    id: "start",
    label: "Start",
    items: [
      { href: "/", label: "Home", icon: "home", hint: "Pick a career" },
      { href: "/about", label: "About", icon: "user", hint: "Who Fahad is" },
    ],
  },
  {
    id: "planning",
    label: "Urban Planning",
    track: "planning",
    items: [
      { href: "/planning", label: "Overview", icon: "compass", hint: "Profile, experience, résumé" },
      { href: "/portfolio", label: "Portfolio", icon: "map", hint: "Master plans, GIS, CAD" },
      { href: "/research", label: "Research", icon: "book", hint: "Coursework reports" },
      { href: "/certificates", label: "Certificates", icon: "award", hint: "Letters and awards" },
    ],
  },
  {
    id: "business",
    label: "Business Development",
    track: "business",
    items: [
      { href: "/business", label: "Overview", icon: "briefcase", hint: "Profile, experience, résumé" },
      { href: "/results", label: "Results", icon: "chart", hint: "Numbers against target" },
      { href: "/engagements", label: "Engagements", icon: "handshake", hint: "Wins sourced and closed" },
    ],
  },
  {
    id: "more",
    label: "More",
    items: [
      { href: "/worked-with", label: "Worked with", icon: "building", hint: "Organisations and links" },
      { href: "/contact", label: "Contact", icon: "mail", hint: "Email, phone, LinkedIn" },
    ],
  },
];

/** Pages that belong to a career without being in the menu (project pages, the combined timeline). */
export const groupForPath = (path: string): string | undefined => {
  if (path.startsWith("/work/")) return "planning";
  return nav.find((g) => g.items.some((i) => i.href === path))?.id;
};

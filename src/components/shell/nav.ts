// Site structure: one entry per page; two groups have sub-pages. Same order as the original sidebar.
export type NavLeaf = { href: string; label: string };
export type NavItem = NavLeaf | { label: string; children: NavLeaf[] };

export const nav: NavItem[] = [
  { href: "/", label: "Overview" },
  {
    label: "Urban Planning",
    children: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/research", label: "Research" },
      { href: "/certificates", label: "Certificates" },
    ],
  },
  {
    label: "Business",
    children: [
      { href: "/results", label: "Results" },
      { href: "/engagements", label: "Engagements" },
    ],
  },
  { href: "/experience", label: "Experience" },
  { href: "/worked-with", label: "Worked with" },
  { href: "/about", label: "About" },
];

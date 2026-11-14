// Words for the v5 layout: a neutral home page that sends the visitor to one career, a page per career,
// and a specific About page. Every fact here restates something in experience.ts, metrics.ts,
// education.ts or skills.ts — change it there first.

export const home = {
  status: "Open to roles",
  title: "Hi, I'm Fahad Ali.",
  lead: "I work in two fields. Pick the one you're hiring for and you'll only see what matters for that role.",
  prompt: "Which profile do you need?",
  careers: [
    {
      track: "planning",
      href: "/planning",
      label: "Urban Planning & GIS",
      line: "Master plans, cadastral GIS and planning research.",
      inside: ["Experience in public-sector planning and GIS", "Projects with every drawing sheet", "Research, certificates and letters"],
      cta: "Open planning profile",
    },
    {
      track: "business",
      href: "/business",
      label: "Business Development",
      line: "Lead generation, proposals and closing for B2B services.",
      inside: ["Experience across the full sales cycle", "Results against monthly targets", "Enterprise wins, client names withheld"],
      cta: "Open business profile",
    },
  ],
  faqTitle: "Not sure yet?",
  contactTitle: "Have a role in mind?",
  contactLead: "Email or LinkedIn is fastest.",
} as const;

export const cta = {
  rest: "Get in touch",
  hover: "Let's land a win",
} as const;

export const careerPages = {
  planning: {
    label: "Urban Planning & GIS",
    proof: { href: "/portfolio", label: "See the portfolio" },
    expertiseTitle: "What I bring to a planning team",
    experienceTitle: "Planning & GIS experience",
    deeperTitle: "Look closer",
  },
  business: {
    label: "Business Development",
    proof: { href: "/results", label: "See the results" },
    expertiseTitle: "What I own in the sales cycle",
    experienceTitle: "Business development experience",
    deeperTitle: "Look closer",
  },
} as const;

export const about = {
  title: "About Fahad",
  lead: "I'm a City & Regional Planning student at UET Lahore (B.Sc., 2023 – 2027) who has built two working careers alongside the degree: planning and GIS on one side, B2B business development on the other.",
  now: "Right now I'm a Sales & Marketing Specialist at Innotec Engineering Services in Lahore.",
  glanceTitle: "At a glance",
  pathTitle: "How I got here",
  pathLead: "The same years, two tracks. Each line is a real role; open the career page for the detail.",
  paths: {
    planning: [
      { when: "2024", text: "Three internships in one summer: land-use surveys on a NESPAK district master plan with The Union Associates, AutoCAD drawings at Al-Akbari Builders, and land-use conversion cases in LDA's Town Planning Wing." },
      { when: "2025", text: "GIS Specialist at The Spatio. Digitized cadastral and survey data for 13 districts of Punjab under the PULSE programme." },
      { when: "2026", text: "GIS Team Lead at The Spatio on Suthra Punjab. Ran task allocation, review and quality control for a team digitizing mauzas across the province." },
    ],
    business: [
      { when: "2023", text: "Freelance designer and WordPress developer with Spider Marketing, building sites across several niches." },
      { when: "2025", text: "Joined Ideas Animation Studio as a Business Development Associate and was promoted to Specialist after three months. Closed 100+ projects through Upwork, Fiverr and direct outreach." },
      { when: "2026", text: "Moved to Innotec Engineering Services as Sales & Marketing Specialist, generating and qualifying leads for engineering and estimation services." },
    ],
  },
  habitsTitle: "How I work",
  habits: [
    { title: "I check the data before I trust it.", text: "Cadastral work fails quietly. On PULSE and Suthra Punjab my job was attribute integrity, topological consistency and QC before anything was handed over." },
    { title: "I listen before I pitch.", text: "Discovery calls come first, the proposal second. That is how more than 80% of my client meetings turned into signed work." },
    { title: "I write things people can say yes to.", text: "A 2,828-acre master plan and a client's half-formed brief need the same thing: a clear, structured proposal with nothing left to guess." },
  ],
  moreTitle: "More detail",
} as const;

// Words for the layout: a neutral home page that sends the visitor to one career, a page per career, and
// a specific About page. Every fact here restates something in experience.ts, metrics.ts, education.ts or
// skills.ts — change it there first. Short strings (titles, labels, buttons) carry no closing period.

export const home = {
  title: "Fahad Ali",
  lead: "Town planning and GIS on one side, B2B business development on the other. Pick the one you are hiring for.",
  prompt: "Choose a profile",
  careers: [
    {
      track: "planning",
      href: "/planning",
      code: "P-01",
      short: "Master plans, cadastral GIS and planning research",
      label: "Urban planning and GIS",
      line: "Master plans, cadastral GIS and planning research, from fieldwork for a district master plan to leading a province-wide digitization team",
      inside: ["Experience at The Spatio, LDA and on a NESPAK master plan", "{projects} projects with every drawing sheet", "Research reports, certificates and letters"],
      cta: "Open the planning profile",
    },
    {
      track: "business",
      href: "/business",
      code: "B-01",
      short: "Lead generation, proposals and closing for B2B services",
      label: "Business development",
      line: "Lead generation, discovery calls, proposals and closing for B2B services, through to delivery hand-over",
      inside: ["Experience at Innotec and Ideas Animation Studio", "Revenue against monthly targets, Jul – Dec 2025", "Enterprise wins, client names withheld"],
      cta: "Open the business profile",
    },
  ],
  faqTitle: "Before you choose",
  faqCaption: "The questions recruiters ask first",
  contactTitle: "Have a role in mind",
  contactLead: "Email or LinkedIn is fastest.",
} as const;

export const cta = {
  rest: "Get in touch",
  hover: "Let's land a win",
} as const;

export const careerPages = {
  planning: {
    label: "Urban planning and GIS",
    proof: { href: "/portfolio", label: "See the portfolio" },
    numbersTitle: "In numbers",
    expertiseTitle: "What I bring to a planning team",
    experienceTitle: "Planning and GIS experience",
    deeperTitle: "The evidence",
  },
  business: {
    label: "Business development",
    proof: { href: "/results", label: "See the results" },
    numbersTitle: "In numbers",
    expertiseTitle: "What I own in the sales cycle",
    experienceTitle: "Business development experience",
    deeperTitle: "The evidence",
  },
} as const;

export const about = {
  title: "About Fahad",
  lead: "I'm a City & Regional Planning student at UET Lahore (B.Sc., 2023 – 2027) who has built two working careers alongside the degree: planning and GIS on one side, B2B business development on the other.",
  now: "Right now I'm a Sales & Marketing Specialist at Innotec Engineering Services in Lahore.",
  glanceTitle: "At a glance",
  pathTitle: "How I got here",
  pathLead: "The same years, two tracks. Each line is a real role; the career pages have the detail.",
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
    { title: "I check the data before I trust it", text: "Cadastral work fails quietly. On PULSE and Suthra Punjab my job was attribute integrity, topological consistency and QC before anything was handed over." },
    { title: "I listen before I pitch", text: "Discovery calls come first, the proposal second. That is how more than 80% of my client meetings turned into signed work." },
    { title: "I write things people can say yes to", text: "A 2,828-acre master plan and a client's half-formed brief need the same thing: a clear, structured proposal with nothing left to guess." },
  ],
  moreTitle: "More detail",
} as const;

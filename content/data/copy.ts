// Words written for the v3 layout (hero, captions, labels). Everything factual still comes from the other
// files; this file only holds the short lines the new design needs. Headlines reuse v1 wording where it exists.

export const copy = {
  greeting: "Hey. I'm Fahad,",
  /** The three hero lines: caps / italic serif / caps */
  headline: ["Town Planner", "& Business", "Developer"] as const,
  intro: "Spatial thinking. Commercial instinct. From the parcel to the province, and from first message to signed scope.",
  contactButton: "Contact me",

  /** Capability strip under the hero: titles from skills.ts (planning ×2, business ×2) */
  capabilities: {
    planning: ["Town & Master Planning", "GIS & Cadastral Mapping"],
    business: ["Lead Generation", "Negotiation & Closing"],
  },

  workedWith: {
    title: "Worked with",
    caption: "From a development authority and geo-spatial consultants to a creative studio and an engineering-services firm.",
    next: "Your team next?",
  },

  about: { title: "Two careers, one way of working." },

  work: {
    title: "Portfolio",
    caption: "Master plans, urban design and GIS — studio and professional work. Group projects are credited on each project page.",
  },

  experience: {
    title: "Experience",
    caption: "Planning and GIS on one track, business development on the other — newest first. Open a role for the details.",
  },

  results: {
    title: "Results",
    caption: "Numbers from the record — business development at Ideas Animation Studio.",
    chartTitle: "Monthly target attainment",
    engagementsTitle: "Wins I sourced and closed",
    engagementsCaption: "Client names are withheld for confidentiality.",
  },

  research: {
    title: "Research",
    caption: "Coursework research at the Department of City & Regional Planning, UET Lahore, from transit-oriented development to heritage conservation.",
  },

  recognition: {
    title: "Recognition",
    caption: "Completion letters that show my national ID number are listed without a public preview.",
    planningTitle: "Certificates, letters & awards",
    businessTitle: "Business recognition",
    noPreview: "No public preview",
  },

  contact: {
    title: "Let's talk.",
    lead: "Write to me directly — email or LinkedIn is fastest.",
  },
} as const;

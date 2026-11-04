import type { Project, Role } from "@content/schema.ts";

/** "FA Avenue 1 — Integrated Urban Development Master Plan" → ["FA Avenue 1", "Integrated Urban Development Master Plan"] */
export function splitTitle(title: string): [string, string | undefined] {
  const [head, ...rest] = title.split(" — ");
  return [head!, rest.length ? rest.join(" — ") : undefined];
}

/** One line under a project title: subtitle if the title has one, otherwise location. */
export const projectLine = (p: Project) => splitTitle(p.title)[1] ?? p.location ?? p.category;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar 2026" → sortable number 202603 */
export function monthValue(s: string): number {
  const [mon, year] = s.split(" ");
  return Number(year) * 100 + MONTHS.indexOf(mon ?? "") + 1;
}

export const byStartDesc = (a: Role, b: Role) => monthValue(b.start) - monthValue(a.start);

export const roleDates = (r: Role) => `${r.start} – ${r.end === "present" ? "Now" : r.end}`;

export const trackName = { planning: "Planning", business: "Business" } as const;

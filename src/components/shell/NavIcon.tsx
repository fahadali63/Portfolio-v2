import { Award, BookOpen, BriefcaseBusiness, Building2, ChartNoAxesColumn, Compass, Handshake, House, ListTree, Mail, Map, UserRound, type LucideIcon } from "lucide-react";
import type { NavIcon as Name } from "./nav";

const icons: Record<Name, LucideIcon> = {
  home: House,
  user: UserRound,
  compass: Compass,
  map: Map,
  book: BookOpen,
  award: Award,
  briefcase: BriefcaseBusiness,
  chart: ChartNoAxesColumn,
  handshake: Handshake,
  building: Building2,
  mail: Mail,
  timeline: ListTree,
};

/** One set, one size, one stroke everywhere. */
export function NavIcon({ name, size = 16 }: { name: Name; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}

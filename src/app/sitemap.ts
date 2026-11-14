import { projects } from "@content/index.ts";
import { site } from "@content/site.ts";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/planning", "/business", "/portfolio", "/research", "/certificates", "/results", "/engagements", "/experience", "/worked-with", "/about", "/contact"];
  return [...pages.map((p) => ({ url: `${site.domain}${p}` })), ...projects.map((p) => ({ url: `${site.domain}/work/${p.slug}` }))];
}

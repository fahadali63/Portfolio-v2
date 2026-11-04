// Runs after `next build`: scans the finished site in out/ for anything private (rules: content/docs/conflicts.md).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ALLOWED_FOLDER = "1mQkZ0MWUa1Gh4jjPMZGz8N5Pdt3R_9bO";
const checks = [
  { what: "the root Drive folder", re: /1gDR2MGFBEFy6dn87cuJ2R1esL-1oUXn_/ },
  { what: "a Drive folder other than the portfolio folder", re: new RegExp(`/folders/(?!${ALLOWED_FOLDER})`) },
  { what: "the second (LinkedIn) phone number", re: /\+?92[\s-]?318/ },
  { what: "a neighbourhood from the résumé", re: /Qainchi/i },
  { what: "a roll number", re: /\b20\d\d-CRP-\d+/i },
  { what: "a national ID number", re: /\b\d{5}-\d{7}-\d\b/ },
  { what: "a path into content/originals", re: /content\/originals/ },
];

const problems = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(html|txt|js|json|xml|css)$/.test(name)) {
      const text = readFileSync(path, "utf8");
      for (const c of checks) if (c.re.test(text)) problems.push(`  ✗ ${path}: contains ${c.what}`);
    }
    if (name.startsWith(".") && name !== ".DS_Store") problems.push(`  ✗ ${path}: hidden file in the published site`);
  }
};
walk("out");
if (problems.length) {
  console.error(`Privacy check failed:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("✓ Privacy check passed (out/)");

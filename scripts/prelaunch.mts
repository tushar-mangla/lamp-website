// Pre-launch checklist: `npm run prelaunch` (use SITE_URL=https://yourdomain npm run prelaunch).
// Lists every placeholder that must be filled before taking real orders. Exits 1 if anything blocks launch.
import { readFileSync, readdirSync } from "node:fs";
import { media, product, seller, shipping, site } from "../src/lib/site.ts";

type Item = [ok: boolean, label: string, fix: string];
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const policies = readFileSync(new URL("../src/lib/policies.ts", import.meta.url), "utf8");
const story = readFileSync(new URL("../src/app/our-story/page.tsx", import.meta.url), "utf8");
const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
const photos = readdirSync(new URL("../public", import.meta.url)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

const checks: Item[] = [
  [site.isLive, "SITE_URL set to the real domain", "Set SITE_URL in the deploy env (until then the site is noindex)."],
  [site.isLive && host(site.email.split("@")[1] ? "https://" + site.email.split("@")[1] : "") === host(site.url), "Support email on the real domain", `Email is ${site.email}.`],
  [Boolean(site.whatsapp), "WhatsApp number", "src/lib/site.ts → site.whatsapp"],
  [Boolean(site.amazonUrl), "Amazon.in listing URL", "src/lib/site.ts → site.amazonUrl (optional at launch)"],
  [Boolean(seller.legalName && seller.address && seller.gstin), "Seller legal name, address, GSTIN", "src/lib/site.ts → seller (E-Commerce Rules disclosure)"],
  [Boolean(seller.grievanceOfficer.name && seller.grievanceOfficer.email), "Grievance officer name + email", "src/lib/site.ts → seller.grievanceOfficer"],
  [shipping.confirmed, "Shipping, COD and return terms confirmed with courier/gateway", "src/lib/site.ts → shipping (then set confirmed: true)"],
  [!product.specs.some((s) => s.verify), "Specs measured on our own units", `Unverified: ${product.specs.filter((s) => s.verify).map((s) => s.label).join(", ")}`],
  [!/\[[^\]]+\]/.test(policies), "Policies have no [bracketed] placeholders", "src/lib/policies.ts: review with CA/lawyer"],
  [!story.includes("TODO(founder)"), "Our Story written by the founder", "src/app/our-story/page.tsx"],
  [!media.demo.isIllustration, "Real product video (not the animation)", "Replace /public/video/* and set media.demo.isIllustration = false"],
  [photos.length >= 6, `Product photos in /public (${photos.length} found)`, "Add 6–10 real photos and use them in the product page"],
  [!site.isLive || llms.includes(host(site.url)), "llms.txt points at the real domain", "public/llms.txt"],
];

let blocking = 0;
for (const [ok, label, fix] of checks) {
  if (!ok) blocking++;
  console.log(`${ok ? "✅" : "❌"} ${label}${ok ? "" : `\n     → ${fix}`}`);
}
console.log(`\n${blocking ? `${blocking} item(s) to fix before launch.` : "Ready to launch."}`);
process.exit(blocking ? 1 : 0);

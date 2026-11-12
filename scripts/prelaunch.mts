// Pre-launch checklist (US market): `npm run prelaunch` (use SITE_URL=https://yourdomain npm run prelaunch).
// Lists every placeholder that must be filled before taking real orders. Exits 1 if anything blocks launch.
import { readFileSync, readdirSync } from "node:fs";
import { compliance, media, product, seller, shipping, site } from "../src/lib/site.ts";

type Item = [ok: boolean, label: string, fix: string];
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const policies = readFileSync(new URL("../src/lib/policies.ts", import.meta.url), "utf8");
const story = readFileSync(new URL("../src/app/our-story/page.tsx", import.meta.url), "utf8");
const photos = readdirSync(new URL("../public", import.meta.url)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
const missingCheckout = product.colors.filter((c) => !site.checkoutUrls[c.name]).map((c) => c.name);

const checks: Item[] = [
  [site.isLive, "SITE_URL set to the real domain", "Set SITE_URL in the deploy env (until then the site is noindex)."],
  [site.isLive && host("https://" + (site.email.split("@")[1] ?? "")) === host(site.url), "Support email on the real domain", `Email is ${site.email}.`],
  [missingCheckout.length === 0, "Checkout link for every color (Shopify / Stripe Payment Link)", `Missing: ${missingCheckout.join(", ")} → src/lib/site.ts → site.checkoutUrls`],
  [Boolean(site.amazonUrl), "Amazon.com listing URL (optional)", "src/lib/site.ts → site.amazonUrl"],
  [Boolean(seller.legalName && seller.address && seller.state), "Seller legal name, US address, governing-law state", "src/lib/site.ts → seller (Terms, footer, CAN-SPAM)"],
  [shipping.confirmed, "Shipping, returns and payments confirmed with 3PL/carrier/checkout", "src/lib/site.ts → shipping (then set confirmed: true)"],
  [compliance.fccSdoc, "FCC Part 15 SDoC for the lamp electronics", "Get from the factory/test lab, then compliance.fccSdoc = true"],
  [compliance.un383, "UN 38.3 battery test summary + MSDS", "Required by carriers and Amazon for lithium batteries"],
  [compliance.originMarking, '"Made in China" marked on product/packaging', "CBP country-of-origin marking"],
  [compliance.prop65Reviewed, "California Prop 65 reviewed", "Supplier materials declaration; add a warning if needed"],
  [compliance.salesTax, "Sales tax collection set up in checkout", "Shopify Tax / Stripe Tax for states with nexus"],
  [!product.specs.some((s) => s.verify), "Specs measured on our own units", `Unverified: ${product.specs.filter((s) => s.verify).map((s) => s.label).join(", ")}`],
  [!/\[[^\]]+\]/.test(policies), "Policies have no [bracketed] placeholders", "src/lib/policies.ts: review with a US attorney"],
  [!story.includes("TODO(founder)"), "Our Story written by the founder", "src/app/our-story/page.tsx"],
  [!media.demo.isIllustration, "Real product video (not the animation)", "Replace /public/video/* and set media.demo.isIllustration = false"],
  [photos.length >= 6, `Product photos in /public (${photos.length} found)`, "Add 6–10 real photos and use them in the product page"],
];

let blocking = 0;
for (const [ok, label, fix] of checks) {
  if (!ok) blocking++;
  console.log(`${ok ? "✅" : "❌"} ${label}${ok ? "" : `\n     → ${fix}`}`);
}
console.log(`\n${blocking ? `${blocking} item(s) to fix before launch.` : "Ready to launch."}`);
process.exit(blocking ? 1 : 0);

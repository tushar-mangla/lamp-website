/**
 * Single source of truth for brand facts, prices, links and specs.
 * Everything marked `verify` comes from the reference product (AUGE LIGHT B0D6YVTBG3)
 * and must be measured on our own units before launch.
 * Run `npm run prelaunch` to list everything still missing.
 */

/** Real production domain, e.g. https://motiflo.in. Set SITE_URL in the deploy environment.
 *  While unset, the site is served as `noindex` so a preview can't be indexed under a wrong domain. */
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "") ?? "";

export const site = {
  name: "MOTIFLO",
  tagline: "Light, with a little movement.",
  description:
    "MOTIFLO is a cordless mini mood lamp with a magnetic, flexible LED filament you can shake into new shapes. Battery-tested, gift-boxed and backed by a 1-year India replacement warranty.",
  url: SITE_URL || "http://localhost:3000",
  isLive: Boolean(SITE_URL),
  locale: "en_IN",
  currency: "INR",
  email: "hello@motiflo.in", // TODO(founder): use an inbox on the real domain
  /** WhatsApp number in international format without "+", e.g. "919876543210". Empty = hidden. */
  whatsapp: "",
  instagram: "",
  /** Amazon.in listing URL. Empty = shows "launching soon". */
  amazonUrl: "",
  /** Fixed copyright year (Cache Components forbids Date() in prerendered output). */
  year: 2026,
};

/** Seller disclosures required for Indian e-commerce (Consumer Protection (E-Commerce) Rules, 2020).
 *  TODO(founder + CA): fill every field before taking orders. */
export const seller = {
  legalName: "",
  address: "",
  gstin: "",
  grievanceOfficer: { name: "", email: "", phone: "" },
};

export const season = {
  enabled: true,
  name: "The Season of Glow",
  line: "Make this Christmas a little warmer.",
  /** Last order date for Christmas delivery. Set from the Easy Ship / courier promise. */
  orderBy: "19 December",
  /** After this moment (IST), order-by messages hide themselves in the browser. */
  orderByEndsISO: "2026-12-20T00:00:00+05:30",
  occasion: "Christmas",
};

/** TODO(founder): confirm with your courier and payment gateway; these drive the
 *  product page, structured data and policies. */
export const shipping = {
  freeShipping: true,
  feeInr: 0,
  dispatchDays: "1–2",
  deliveryDays: "2–7",
  minDeliveryDays: 2,
  maxDeliveryDays: 7,
  cod: true,
  prepaid: "UPI, cards & netbanking",
  returnDays: 7,
  confirmed: false,
};

export const media = {
  demo: {
    wide: "/video/motiflo-demo-wide.mp4",
    widePoster: "/video/motiflo-demo-wide.jpg",
    square: "/video/motiflo-demo-square.mp4",
    squarePoster: "/video/motiflo-demo-square.jpg",
    /** It's an animation, not product footage; keep the label until real footage replaces it. */
    isIllustration: true,
  },
};

export const product = {
  slug: "lamp",
  name: "MOTIFLO Mini Mood Lamp",
  edition: "Gift Box Edition",
  /** Open decision in marketing/FRAMEWORK.md: ₹1,999–₹2,499. */
  price: 2499,
  /** No inflated MRP: show compare-at only if it is a real former price. */
  compareAt: null as number | null,
  /** MRP printed on the pack (Legal Metrology). Usually equals price at launch. */
  mrp: 2499,
  countryOfOrigin: "China",
  sku: "MTF-MINI-01",
  colours: [
    { name: "Mist Grey", hex: "#9A9A96" },
    { name: "Ivory", hex: "#EFE9DC" },
  ],
  inTheBox: [
    "MOTIFLO mini lamp",
    "1 m USB-C charging cable",
    "Microfibre cleaning cloth",
    "Care & warranty card",
    "Gift note card",
    "Keepsake gift box",
  ],
  // Reference specs: VERIFY on our own units.
  specs: [
    { label: "Size", value: "approx. 7 × 7 × 14.4 cm (palm-sized)", verify: true },
    { label: "Light", value: "Warm 2700K, 144 LEDs on a flexible magnetic filament", verify: true },
    { label: "Touch modes", value: "Soft · Bright · Breathing · Off", verify: true },
    { label: "Battery", value: "1500 mAh rechargeable, USB-C", verify: true },
    { label: "Charge time", value: "approx. 3 hours", verify: true },
    { label: "Run time", value: "approx. 8 h bright, 11 h soft (to be measured)", verify: true },
    { label: "Materials", value: "Clear polycarbonate shell, matte base", verify: true },
    { label: "Warranty", value: "1-year India replacement warranty", verify: false },
    { label: "Country of origin", value: "China", verify: false },
  ],
};

export const nav = [
  { href: "/lamp", label: "The Lamp" },
  { href: "/gifts/christmas", label: "Gifts" },
  { href: "/corporate-gifting", label: "Corporate" },
  { href: "/our-story", label: "Our Story" },
];

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function whatsappLink(message: string) {
  if (!site.whatsapp) return "";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(colour?: string) {
  return `Hi MOTIFLO! I'd like to order the ${product.name} (${product.edition})${colour ? `, colour: ${colour}` : ""}, at ${formatINR(product.price)}.`;
}

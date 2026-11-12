/**
 * Single source of truth for brand facts, prices, links and specs. Market: United States.
 * Everything marked `verify` comes from the reference product (AUGE LIGHT B0D6YVTBG3)
 * and must be measured on our own units before launch.
 * Run `npm run prelaunch` to list everything still missing.
 */

/** Real production domain, e.g. https://motiflo.com. Set SITE_URL in the deploy environment.
 *  While unset, the site is served as `noindex` so a preview can't be indexed under a wrong domain. */
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "") ?? "";

export const site = {
  name: "MOTIFLO",
  tagline: "Light, with a little movement.",
  description:
    "MOTIFLO is a cordless mini mood lamp with a magnetic, flexible LED filament you can shake into new shapes. $29, gift-boxed, battery-tested, with a 1-year warranty and free US shipping.",
  url: SITE_URL || "http://localhost:3000",
  isLive: Boolean(SITE_URL),
  market: "US",
  locale: "en_US",
  lang: "en-US",
  currency: "USD",
  email: "hello@motiflo.com", // TODO(founder): an inbox on the real domain
  instagram: "",
  tiktok: "",
  /** Direct checkout per color: a Shopify product/cart link or a Stripe Payment Link.
   *  Empty = the button becomes "Reserve yours" (prefilled email; you reply with a payment link). */
  checkoutUrls: {
    "Mist Gray": "",
    Ivory: "",
  } as Record<string, string>,
  /** Amazon.com listing URL. Empty = shows "Amazon: coming soon". */
  amazonUrl: "",
  /** Fixed copyright year (Cache Components forbids Date() in prerendered output). */
  year: 2026,
};

/** Business identity shown in the footer and Terms (also needed for CAN-SPAM in marketing emails:
 *  every email must carry a valid physical postal address). TODO(founder): fill before taking orders. */
export const seller = {
  legalName: "", // e.g. "MOTIFLO LLC"
  address: "", // US business or registered-agent address
  state: "", // governing-law state, e.g. "Delaware"
};

export const season = {
  enabled: true,
  name: "The Season of Glow",
  line: "The $29 gift that changes shape.",
  /** Last order date for delivery by Dec 25 in the contiguous US.
   *  USPS 2026 recommended ship-by dates: Ground Advantage Dec 17, Priority Mail Dec 18, Express Dec 19.
   *  Order-by = ship-by minus our dispatch time. Re-set this from your 3PL/carrier. */
  orderBy: "December 15",
  orderByShort: "Dec 15",
  /** After this moment (US Eastern), order-by messages hide themselves in the browser. */
  orderByEndsISO: "2026-12-16T00:00:00-05:00",
  occasion: "Christmas",
  /** Extended holiday returns (Loftie-style). */
  holidayReturnsUntil: "January 31, 2027",
};

/** TODO(founder): confirm with your 3PL / carrier and checkout provider; these drive the
 *  product page, structured data and policies. Assumes stock ships from a US warehouse. */
export const shipping = {
  freeShipping: true,
  feeUsd: 0,
  shipsFrom: "the US",
  destinations: "the contiguous US (lower 48)",
  dispatchDays: "1–2",
  deliveryDays: "3–5",
  handlingMin: 1,
  handlingMax: 2,
  minDeliveryDays: 3,
  maxDeliveryDays: 5,
  payments: "Cards, Apple Pay & Google Pay",
  returnDays: 30,
  confirmed: false,
};

/** US launch compliance. Flip each to true only with the document in hand. Checked by `npm run prelaunch`. */
export const compliance = {
  /** FCC Part 15 (unintentional radiator) Supplier's Declaration of Conformity for the LED driver/charger circuit. */
  fccSdoc: false,
  /** UN 38.3 test summary + MSDS for the lithium battery (required by carriers and Amazon). */
  un383: false,
  /** "Made in China" marked on product or packaging (CBP country-of-origin marking). */
  originMarking: false,
  /** California Prop 65: supplier materials declaration reviewed; warning added if needed. */
  prop65Reviewed: false,
  /** Sales tax: checkout provider collecting where you have nexus. */
  salesTax: false,
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
  /** Flat, honest price. No inflated "regular" price (FTC Guides Against Deceptive Pricing). */
  price: 29,
  /** Show compare-at only if it is a real former price you actually sold at. */
  compareAt: null as number | null,
  countryOfOrigin: "China",
  sku: "MTF-MINI-01",
  colors: [
    { name: "Mist Gray", hex: "#9A9A96" },
    { name: "Ivory", hex: "#EFE9DC" },
  ],
  inTheBox: [
    "MOTIFLO mini lamp",
    "3 ft USB-C charging cable",
    "Microfiber cleaning cloth",
    "Care & warranty card",
    "Gift note card",
    "Keepsake gift box",
  ],
  // Reference specs: VERIFY on our own units.
  specs: [
    { label: "Size", value: "approx. 5.7 in tall × 2.8 in wide (14.4 × 7 cm), palm-sized", verify: true },
    { label: "Light", value: "Warm 2700K, 144 LEDs on a flexible magnetic filament", verify: true },
    { label: "Touch modes", value: "Soft · Bright · Breathing · Off", verify: true },
    { label: "Battery", value: "1500 mAh rechargeable lithium, USB-C", verify: true },
    { label: "Charge time", value: "approx. 3 hours", verify: true },
    { label: "Run time", value: "approx. 8 h bright, 11 h soft (to be measured)", verify: true },
    { label: "Materials", value: "Clear polycarbonate shell, matte base", verify: true },
    { label: "Warranty", value: "1-year replacement warranty", verify: false },
    { label: "Country of origin", value: "Made in China", verify: false },
  ],
};

export const nav = [
  { href: "/gifts/christmas", label: "Holiday Shop" },
  { href: "/lamp", label: "The Lamp" },
  { href: "/corporate-gifting", label: "Corporate" },
  { href: "/our-story", label: "Our Story" },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

export function orderMessage(color?: string) {
  return `Hi MOTIFLO! I'd like to reserve the ${product.name} (${product.edition})${color ? `, color: ${color}` : ""}, at ${formatPrice(product.price)}.\n\nShip to (name, address, ZIP):\nGift message (optional):\n\nPlease send me a secure payment link.`;
}

/** Where the main buy button goes: real checkout if configured, else a prefilled reservation email. */
export function buyLink(color?: string) {
  const url = site.checkoutUrls[color ?? product.colors[0].name] ?? "";
  if (url) return { href: url, label: "Buy now", external: true };
  return {
    href: `mailto:${site.email}?subject=${encodeURIComponent("Reserve: " + product.name)}&body=${encodeURIComponent(orderMessage(color))}`,
    label: "Reserve yours",
    external: false,
  };
}

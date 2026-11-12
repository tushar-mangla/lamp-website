import Link from "next/link";
import { product, seller, site } from "@/lib/site";

const cols = [
  { title: "Shop", links: [["/gifts/christmas", "Holiday Shop"], ["/lamp", "The Lamp"], ["/corporate-gifting", "Corporate gifting"]] },
  { title: "Help", links: [["/faq", "FAQ"], ["/contact", "Contact"], ["/policies/shipping", "Shipping"], ["/policies/returns", "Returns"], ["/policies/warranty", "Warranty"]] },
  { title: "Brand", links: [["/our-story", "Our story"], ["/policies/privacy", "Privacy"], ["/policies/terms", "Terms"]] },
] as const;

export function Footer() {
  return (
    <footer className="night bg-night text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="font-display text-3xl tracking-[0.18em] text-ivory">{site.name}</p>
          <p className="mt-3 max-w-xs font-display text-lg italic text-ivory/70">{site.tagline}</p>
          <p className="mt-6 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-glow">{site.email}</a>
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50">{c.title}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-glow">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-6xl gap-2 px-4 py-6 text-xs text-ivory/55 sm:px-6 md:grid-cols-2">
          <p>
            Sold by {seller.legalName || "[legal entity]"}{seller.address ? `, ${seller.address}` : ""} · Made in {product.countryOfOrigin}
          </p>
          <p className="md:text-right">© {site.year} {site.name}. Prices in USD. Ships within the US.</p>
        </div>
      </div>
    </footer>
  );
}

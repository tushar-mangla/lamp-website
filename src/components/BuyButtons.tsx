import { formatINR, orderMessage, product, site, whatsappLink } from "@/lib/site";

export function BuyButtons({ tone = "light", compact = false, colour }: { tone?: "light" | "dark"; compact?: boolean; colour?: string }) {
  const msg = orderMessage(colour);
  const wa = whatsappLink(msg);
  const primary = tone === "dark" ? "bg-glow text-ink hover:bg-[#ffd48f]" : "bg-ink text-ivory hover:bg-charcoal";
  const secondary = tone === "dark" ? "border-ivory/30 text-ivory hover:bg-ivory/10" : "border-ink/25 text-ink hover:bg-ink/5";
  const pad = compact ? "px-5 py-3" : "px-7 py-4";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`rounded-full ${pad} text-center font-medium transition ${primary}`}>
          Order on WhatsApp · {formatINR(product.price)}
        </a>
      ) : (
        <a href={`mailto:${site.email}?subject=${encodeURIComponent("Order: " + product.name)}&body=${encodeURIComponent(msg)}`} className={`rounded-full ${pad} text-center font-medium transition ${primary}`}>
          Order now · {formatINR(product.price)}
        </a>
      )}
      {site.amazonUrl ? (
        <a href={site.amazonUrl} target="_blank" rel="noopener noreferrer" className={`rounded-full border ${pad} text-center font-medium transition ${secondary}`}>
          Buy on Amazon.in
        </a>
      ) : (
        <span className={`rounded-full border border-dashed ${pad} text-center text-sm opacity-70 ${secondary}`} aria-disabled="true">
          Amazon.in: launching soon
        </span>
      )}
    </div>
  );
}

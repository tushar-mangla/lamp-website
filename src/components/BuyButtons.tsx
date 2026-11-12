import { buyLink, formatPrice, product, shipping, site } from "@/lib/site";

export function BuyButtons({ tone = "light", compact = false, color }: { tone?: "light" | "dark"; compact?: boolean; color?: string }) {
  const buy = buyLink(color);
  const primary = tone === "dark" ? "bg-glow text-ink hover:bg-[#ffd48f]" : "bg-ink text-ivory hover:bg-charcoal";
  const secondary = tone === "dark" ? "border-ivory/30 text-ivory hover:bg-ivory/10" : "border-ink/25 text-ink hover:bg-ink/5";
  const subtle = tone === "dark" ? "text-ivory/60" : "text-muted";
  const pad = compact ? "px-5 py-3" : "px-7 py-4";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={buy.href}
          {...(buy.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`rounded-full ${pad} text-center font-medium transition ${primary}`}
        >
          {buy.label} · {formatPrice(product.price)}
        </a>
        {site.amazonUrl ? (
          <a href={site.amazonUrl} target="_blank" rel="noopener noreferrer" className={`rounded-full border ${pad} text-center font-medium transition ${secondary}`}>
            Buy on Amazon
          </a>
        ) : (
          <span className={`rounded-full border border-dashed ${pad} text-center text-sm opacity-70 ${secondary}`} aria-disabled="true">
            Amazon: coming soon
          </span>
        )}
      </div>
      <p className={`mt-3 text-xs ${subtle}`}>
        {shipping.freeShipping ? "Free US shipping" : "US shipping"} · {shipping.returnDays}-day returns · 1-year warranty
        {!buy.external && " · We'll email you a secure payment link"}
      </p>
    </div>
  );
}

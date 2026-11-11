import { formatINR, product, site, whatsappLink } from "@/lib/site";

export function MobileBuyBar() {
  const href =
    whatsappLink(`Hi MOTIFLO! I'd like to order the ${product.name} (${product.edition}).`) ||
    `mailto:${site.email}?subject=${encodeURIComponent("Order: " + product.name)}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory-soft/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{product.edition}</p>
          <p className="text-lg font-semibold">{formatINR(product.price)}</p>
        </div>
        <a href={href} className="rounded-full bg-ink px-6 py-3 font-medium text-ivory">Order now</a>
      </div>
    </div>
  );
}

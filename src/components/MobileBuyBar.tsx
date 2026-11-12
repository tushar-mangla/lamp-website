import { buyLink, formatPrice, product } from "@/lib/site";

export function MobileBuyBar() {
  const buy = buyLink();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory-soft/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Gift-boxed · Free shipping</p>
          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
        </div>
        <a
          href={buy.href}
          {...(buy.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="rounded-full bg-ink px-6 py-3 font-medium text-ivory"
        >
          {buy.label}
        </a>
      </div>
    </div>
  );
}

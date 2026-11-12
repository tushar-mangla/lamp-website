import { formatPrice, product, season, shipping } from "@/lib/site";

export function DeliveryInfo() {
  const items: [string, string, string?][] = [
    [
      "Shipping",
      `${shipping.freeShipping ? "Free" : formatPrice(shipping.feeUsd)} to ${shipping.destinations} · ships from ${shipping.shipsFrom} in ${shipping.dispatchDays} business days · arrives in ${shipping.deliveryDays} business days`,
    ],
    ...(season.enabled ? [[season.occasion, `Order by ${season.orderBy} for delivery by Dec 25`, "season-only"] as [string, string, string]] : []),
    ["Payment", `${shipping.payments} · sales tax calculated at checkout`],
    ["Returns", `${shipping.returnDays}-day returns · holiday orders returnable through ${season.holidayReturnsUntil} · damaged on arrival replaced free`],
    ["Origin", `Made in ${product.countryOfOrigin} · every lamp battery-tested before it ships`],
  ];
  return (
    <dl className="mt-6 grid gap-3 text-sm">
      {items.map(([k, v, cls]) => (
        <div key={k} className={`grid grid-cols-[5.5rem_1fr] gap-3 ${cls ?? ""}`}>
          <dt className="font-medium">{k}</dt>
          <dd className="text-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

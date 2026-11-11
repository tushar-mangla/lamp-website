import { product, shipping } from "@/lib/site";

export function DeliveryInfo() {
  const items = [
    ["Delivery", `${shipping.freeShipping ? "Free shipping across India" : `Shipping ₹${shipping.feeInr}`} · dispatched in ${shipping.dispatchDays} working days · arrives in ${shipping.deliveryDays} days`],
    ["Payment", `${shipping.prepaid}${shipping.cod ? " · Cash on delivery available" : ""}`],
    ["Returns", `Unused in original box within ${shipping.returnDays} days · damaged on arrival replaced free`],
    ["Origin", `Made in ${product.countryOfOrigin} · QC-checked and packed in India`],
  ];
  return (
    <dl className="mt-6 grid gap-3 text-sm">
      {items.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3">
          <dt className="font-medium">{k}</dt>
          <dd className="text-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

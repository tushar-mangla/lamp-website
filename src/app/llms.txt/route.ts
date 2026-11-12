import { formatPrice, product, season, shipping, site } from "@/lib/site";

/** /llms.txt, generated from site.ts so it always uses the real domain and current facts. */
export function GET() {
  const u = site.url;
  const body = `# ${site.name}

> ${site.name} sells a cordless, rechargeable mini mood lamp (about 5.7 in / 14.4 cm tall) with a magnetic, flexible LED filament that changes shape when you shake it. Warm 2700K light, touch modes (soft, bright, breathing, off), USB-C charging. ${formatPrice(product.price)}, gift-boxed, battery-tested, 1-year replacement warranty, ${shipping.freeShipping ? "free shipping" : "shipping"} within the US, ${shipping.returnDays}-day returns.

## Pages
- [The lamp](${u}/lamp): price, specifications, what's in the box, FAQ
- [Holiday Shop](${u}/gifts/christmas): Secret Santa and White Elephant gift under $30, ${season.occasion} order-by date (${season.orderBy})
- [Corporate gifting](${u}/corporate-gifting): 10+ units, volume pricing, one invoice, US-wide delivery
- [FAQ](${u}/faq): size, battery, warranty, shipping
- [Warranty](${u}/policies/warranty)
- [Shipping](${u}/policies/shipping)
- [Returns](${u}/policies/returns)
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

import { season, seller, shipping, site } from "./site";

type Policy = { title: string; summary: string; sections: { h: string; p: string[] }[] };

// DRAFTS for the US market: have these reviewed by a US attorney before launch. Bracketed items are TBD.
export const policies: Record<string, Policy> = {
  shipping: {
    title: "Shipping",
    summary: "Where we ship, how long it takes, and what it costs.",
    sections: [
      { h: "Where we ship", p: [`We ship to ${shipping.destinations} from ${shipping.shipsFrom} via [carrier TBD: USPS Ground Advantage / UPS]. [Alaska, Hawaii, Puerto Rico, APO/FPO: TBD.] We don't ship internationally yet.`] },
      { h: "Processing & delivery", p: [`Every lamp is battery-tested, packed and shipped within [${shipping.dispatchDays}] business days. Delivery usually takes [${shipping.deliveryDays}] business days after shipping. You'll get a tracking link by email.`, "Amazon orders follow the delivery date shown on Amazon."] },
      { h: "Shipping cost", p: [shipping.freeShipping ? "Standard shipping is free on every order within the US. [Expedited options and prices: TBD.]" : "[Shipping rates: TBD]. The cost is always shown before you pay."] },
      { h: `${season.occasion} delivery`, p: [`Order by ${season.orderBy} (standard shipping) for delivery by December 25 in the contiguous US. These dates follow the carriers' recommended holiday ship-by dates and aren't guarantees; carriers can be delayed in peak season. [Last day for expedited shipping: TBD.]`] },
      { h: "Gift orders", p: ["We can ship straight to the person you're gifting, with your handwritten-style gift note card in the box. The packing slip shows no prices."] },
    ],
  },
  returns: {
    title: "Returns",
    summary: "Damaged, faulty or not quite right? Here's what happens.",
    sections: [
      { h: "Damaged or faulty on arrival", p: ["Tell us within [7 days] of delivery with your order number and a short video. We'll send a replacement at no cost; no need to return the faulty one unless we ask."] },
      { h: `${shipping.returnDays}-day returns`, p: [`Changed your mind? Return an unused lamp in its original packaging within ${shipping.returnDays} days of delivery for a full refund. [Return shipping: free label / customer-paid: TBD.] Refunds go back to your original payment method within [5–10] business days of us receiving it.`] },
      { h: "Holiday returns", p: [`Orders placed between [November 1] and December 25 can be returned through ${season.holidayReturnsUntil}, so the person you gift it to has time.`] },
      { h: "Amazon orders", p: ["Amazon orders follow Amazon's return policy; our 1-year replacement warranty still applies."] },
    ],
  },
  warranty: {
    title: "1-year limited warranty",
    summary: "If your MOTIFLO stops working in normal use within a year, we replace it.",
    sections: [
      { h: "What's covered", p: ["Defects in materials and workmanship in normal use for 12 months from delivery, including battery and LED failure. Our remedy is a replacement lamp (or a refund if a replacement isn't available)."] },
      { h: "What's not covered", p: ["Physical damage (drops, cracks), water damage, scratches from normal use, normal battery capacity loss over time, or use with damaged chargers or adapters."] },
      { h: "How to claim", p: [`Email ${site.email} with your order number and a short video showing the issue. Proof of purchase from this website or Amazon is required. Gift recipients can claim too; just give us the buyer's name or order number.`] },
      { h: "Your rights", p: ["This warranty gives you specific legal rights, and you may also have other rights that vary from state to state. [Attorney review: Magnuson-Moss wording.]"] },
    ],
  },
  privacy: {
    title: "Privacy",
    summary: "What we collect, why, and your choices.",
    sections: [
      { h: "What we collect", p: ["Your name, email, shipping address and order details when you buy or contact us. Payments are handled by our checkout provider [Shopify / Stripe: TBD]; we never see or store your full card number. Basic site analytics [tool TBD] and cookies needed to run the site."] },
      { h: "How we use it", p: ["To fulfill orders, provide support and warranty service, and (only if you opt in) send occasional emails. Every marketing email has an unsubscribe link. We don't sell your personal information or share it for cross-context behavioral advertising. [Update if ad pixels are added.]"] },
      { h: "Who we share it with", p: ["Only service providers that help us run the store: checkout/payments, shipping carrier and warehouse, email provider. They may use it only to provide their service to us."] },
      { h: "Your choices", p: [`You can ask to see, correct or delete your personal information at any time, including under California (CCPA/CPRA) and other state privacy laws: email ${site.email}. We'll respond within the time the law requires.`] },
      { h: "Children", p: ["This site isn't directed to children under 13, and we don't knowingly collect their information."] },
    ],
  },
  terms: {
    title: "Terms",
    summary: "The terms for buying from this website.",
    sections: [
      { h: "Seller", p: [`This website is operated by ${seller.legalName || "[legal entity]"}, ${seller.address || "[business address]"}. Contact: ${site.email}.`] },
      { h: "Prices & payment", p: ["Prices are in US dollars. Sales tax is calculated at checkout where it applies. We may change prices, but not for orders already confirmed. If we make a pricing error, we'll contact you before charging."] },
      { h: "Product use & safety", p: ["MOTIFLO is a decorative mood light, not a toy. It contains a lithium-ion battery. Charge with the supplied cable and a certified USB adapter (5V); don't leave it charging unattended for long periods; keep away from water, heat and small children; don't open the base. Contains magnets: keep away from pacemakers and from children who may swallow parts."] },
      { h: "Governing law", p: [`These terms are governed by the laws of the State of ${seller.state || "[state]"}, USA. [Dispute resolution: attorney to confirm.]`] },
    ],
  },
};

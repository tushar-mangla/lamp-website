import { seller, site } from "./site";

type Policy = { title: string; summary: string; sections: { h: string; p: string[] }[] };

// DRAFTS: have these reviewed before launch. Bracketed items are TBD.
export const policies: Record<string, Policy> = {
  shipping: {
    title: "Shipping",
    summary: "Where we deliver, how long it takes, and what it costs.",
    sections: [
      { h: "Where we ship", p: ["We ship across India to serviceable pincodes via our courier partner [courier TBD]."] },
      { h: "Dispatch & delivery", p: ["Orders are battery-tested and dispatched within [1–2] working days. Delivery usually takes [2–7] working days depending on your city.", "Amazon.in orders follow the delivery date shown on Amazon."] },
      { h: "Shipping charges", p: ["[Free shipping / ₹X shipping: TBD]. Any charge is shown before you pay."] },
      { h: "Gift orders", p: ["We can ship directly to the recipient with your gift note. Invoices are emailed to you, not printed in the box."] },
    ],
  },
  returns: {
    title: "Returns & replacements",
    summary: "Damaged, faulty or not right? Here's what happens.",
    sections: [
      { h: "Damaged or faulty on arrival", p: ["Tell us within [48 hours] of delivery with your order number and a short video. We'll send a replacement at no cost."] },
      { h: "Change of mind", p: ["Unused lamps in original packaging can be returned within [7] days of delivery. [Return shipping: TBD]. Refunds go to the original payment method within [5–7] working days of receiving the return."] },
      { h: "Amazon.in orders", p: ["Amazon orders follow Amazon's return policy for the listing; our replacement warranty still applies."] },
    ],
  },
  warranty: {
    title: "1-year replacement warranty",
    summary: "If your MOTIFLO stops working in normal use within a year, we replace it.",
    sections: [
      { h: "What's covered", p: ["Manufacturing defects in normal use for 12 months from delivery, including battery and LED failure."] },
      { h: "What's not covered", p: ["Physical damage (drops, cracks), water damage, scratches from use, or use with damaged chargers."] },
      { h: "How to claim", p: [`Email ${site.email} with your order number and a short video showing the issue. Proof of purchase from this website or Amazon.in is required.`] },
    ],
  },
  privacy: {
    title: "Privacy",
    summary: "What we collect and why.",
    sections: [
      { h: "What we collect", p: ["Name, contact details and delivery address you give us to fulfil orders and answer messages. Basic, anonymous analytics about site usage [analytics tool TBD]."] },
      { h: "How we use it", p: ["Only to process orders, provide support and (if you opt in) send occasional updates. We never sell your data."] },
      { h: "Contact", p: [`Questions or deletion requests: ${site.email}.`] },
    ],
  },
  terms: {
    title: "Terms",
    summary: "The terms for buying from this website.",
    sections: [
      { h: "Seller", p: [`This website is operated by ${seller.legalName || "[legal entity]"}, ${seller.address || "[registered address]"}, GSTIN ${seller.gstin || "[GSTIN]"}. Grievance officer: ${seller.grievanceOfficer.name || "[name]"}, ${seller.grievanceOfficer.email || "[email]"}.`] },
      { h: "Prices", p: ["Prices are in INR and include GST. We may change prices, but not for orders already confirmed."] },
      { h: "Product use", p: ["MOTIFLO is a decorative mood light. Charge with the supplied cable and a certified USB adapter; keep away from water and heat."] },
      { h: "Governing law", p: ["These terms are governed by the laws of India. [Jurisdiction TBD]."] },
    ],
  },
};

import { formatPrice, product, season, shipping } from "./site";

export type Faq = { q: string; a: string };

export const productFaqs: Faq[] = [
  {
    q: "How big is it?",
    a: "It's a mini lamp: about 5.7 inches tall and 2.8 inches wide, a little taller than a coffee mug. It sits comfortably in one hand. It's made to add a glow to a nightstand, desk or shelf, not to light a whole room.",
  },
  {
    q: "What does \"shake to reshape\" mean?",
    a: "The light inside is a flexible LED filament held by magnets. Give the lamp a gentle shake and the filament settles into a new shape. To straighten it again, hold the lamp upright and sway it gently side to side.",
  },
  {
    q: "Does it need to stay plugged in?",
    a: "No. It's cordless with a built-in rechargeable battery. Charge it with the included USB-C cable and any standard USB wall adapter, then place it anywhere.",
  },
  {
    q: "How long does the battery last?",
    a: "We test every lamp's battery before it ships. Run time depends on the mode: roughly a full evening on bright and longer on soft. Exact measured hours are on the product page.",
  },
  {
    q: "Can I adjust the brightness?",
    a: "Yes. Tap the top to cycle through soft, bright and a slow breathing glow, then tap again to switch off.",
  },
  {
    q: "How much is shipping, and when will it arrive?",
    a: `${shipping.freeShipping ? "Shipping is free" : "Shipping is calculated at checkout"} within the US. Orders ship in ${shipping.dispatchDays} business days and usually arrive ${shipping.deliveryDays} business days later. For ${season.occasion}, order by ${season.orderBy}.`,
  },
  {
    q: "What if it arrives damaged or stops working?",
    a: "Every MOTIFLO carries a 1-year replacement warranty. Email us your order number and a short video and we'll send a replacement. No long forms.",
  },
  {
    q: "Can I return it?",
    a: `Yes. Unused lamps can be returned within ${shipping.returnDays} days of delivery, and holiday orders through ${season.holidayReturnsUntil}.`,
  },
  {
    q: "Is it a good gift?",
    a: `It arrives in a keepsake gift box with a gift note card, so it's ready to give. At ${formatPrice(product.price)} it fits most Secret Santa and White Elephant budgets, and it suits anyone who loves their room, their desk setup or small beautiful things.`,
  },
  {
    q: "Where can I buy it?",
    a: "Right here, shipped within the US. For 10+ lamps (office parties, team gifts, clients) see Corporate Gifting.",
  },
];

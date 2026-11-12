import type { Metadata } from "next";
import Link from "next/link";
import { LampVisual } from "@/components/LampVisual";
import { LeadForm } from "@/components/LeadForm";
import { ChristmasVideo } from "@/components/ChristmasVideo";
import { BuyButtons } from "@/components/BuyButtons";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Container, Eyebrow, H2, Section } from "@/components/ui";
import type { Faq } from "@/lib/faqs";
import { formatPrice, product, season, shipping } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secret Santa & White Elephant gift under $30: the lamp that changes shape",
  description: `A cordless shake-to-reshape mood lamp in a keepsake gift box, ${formatPrice(product.price)} with free US shipping. A Christmas gift for coworkers, friends, partners and stockings. Order by ${season.orderBy}.`,
  alternates: { canonical: "/gifts/christmas" },
};

const price = formatPrice(product.price);

const giftFaqs: Faq[] = [
  { q: "What's a good Secret Santa or White Elephant gift under $30?", a: `Something small, a little playful, and useful every evening. MOTIFLO is a cordless mini mood lamp whose magnetic filament changes shape when you shake it. It's ${price}, arrives gift-boxed with a note card, and ships free in the US.` },
  { q: "When should I order for Christmas delivery?", a: `Order by ${season.orderBy} for delivery by December 25 in the contiguous US. That follows the carriers' recommended holiday ship-by dates; peak-season delays can happen, so earlier is safer.` },
  { q: "Can you ship it straight to the person?", a: "Yes. Enter their address as the shipping address and add your gift message; we write it on the note card. The packing slip shows no prices." },
  { q: "What if they want to return it?", a: `Holiday orders can be returned through ${season.holidayReturnsUntil}, unused and in the original box.` },
  { q: "Is it good for an office gift exchange?", a: "Yes: it's universal, desk-friendly and not too personal. For 10+ lamps for a team or clients, see Corporate Gifting for volume pricing and one invoice." },
];

/** Loftie-style "pick a person" (see marketing/competitors/christmas.md). */
const people = [
  ["The coworker", "Secret Santa that ends up on the desk, not in the regift pile.", "Under $30"],
  ["The White Elephant swap", "The gift everyone tries to steal once someone shakes it.", "Under $30"],
  ["The night owl", "A soft nightstand glow to wind down with, instead of a screen.", "Cordless"],
  ["The desk-setup person", "A fidget and a lamp in one. Shake it between calls.", "USB-C"],
  ["The partner", "Two lamps, two shapes, one shared nightstand glow.", "Gift-boxed"],
  ["The stocking", `At 5.7 inches tall, it actually fits. ${price}.`, "Mini"],
];

export default function ChristmasGifts() {
  return (
    <>
      <JsonLd data={faqJsonLd(giftFaqs)} />
      <section className="night relative overflow-hidden bg-night text-ivory">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,rgba(255,180,90,0.18),transparent_70%)]" />
        <Container className="relative grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-glow/90">The Holiday Shop · {season.name}</p>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] sm:text-7xl">Secret Santa, solved. Under $30.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/75">
              MOTIFLO is a cordless mini mood lamp whose magnetic filament changes shape with a shake. {price}, gift-boxed with a note card, battery-tested, and shipped free in the US.
            </p>
            <p className="season-only mt-4 text-glow">Order by {season.orderBy} for delivery by Christmas.</p>
            <div className="mt-8"><BuyButtons tone="dark" /></div>
          </div>
          <div className="flex justify-center"><LampVisual size="lg" initialShape={1} auto /></div>
        </Container>
      </section>

      {/* Dated deadlines: the gap no competitor fills */}
      <section className="season-only border-b border-charcoal/10 bg-ivory">
        <Container className="grid gap-4 py-8 text-sm sm:grid-cols-3">
          <div><p className="font-medium">Order by {season.orderBy}</p><p className="text-muted">Free standard shipping, arrives by Dec 25 (contiguous US)</p></div>
          <div><p className="font-medium">Ships in {shipping.dispatchDays} business days</p><p className="text-muted">Battery-tested and gift-boxed first</p></div>
          <div><p className="font-medium">Returns through {season.holidayReturnsUntil}</p><p className="text-muted">So they have time to decide they love it</p></div>
        </Container>
      </section>

      <Section>
        <Container>
          <Eyebrow>Pick a person</Eyebrow>
          <H2 className="mt-4 max-w-2xl">One gift that works for almost everyone on the list.</H2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map(([t, d, tag]) => (
              <div key={t} className="rounded-3xl bg-ivory p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-deep">{tag}</p>
                <p className="mt-3 font-display text-2xl">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-xl">
            <Eyebrow>Watch it move</Eyebrow>
            <H2 className="mt-4">Twenty seconds. Sound on.</H2>
            <p className="mt-6 text-lg leading-relaxed text-muted">One shake and the light changes shape. That&apos;s the moment the room goes &ldquo;wait, let me try.&rdquo;</p>
          </div>
          <ChristmasVideo />
        </Container>
      </Section>

      <Section className="bg-ivory">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Why it works as a gift</Eyebrow>
            <H2 className="mt-4">Easy to give. Easy to love.</H2>
          </div>
          <ul className="space-y-6">
            {[
              ["It's already wrapped", "Keepsake box and a gift note card. Tell us your message; we write it and pack it in."],
              ["Ship it straight to them", "Use their address at checkout. The packing slip shows no prices."],
              ["It gets used", "Nightstand, desk or shelf, it earns a place every evening."],
              ["It's covered", "Battery-tested before it ships, with a 1-year replacement warranty."],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 border-brass pl-6">
                <p className="text-lg font-medium">{t}</p>
                <p className="mt-1 text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="season-only night bg-ink text-ivory">
        <Container className="py-16"><div className="mx-auto max-w-2xl"><LeadForm tone="dark" title={`Still deciding? We'll email you once before ${season.orderByShort}.`} /></div></Container>
      </section>

      <Section>
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Gifting FAQ</Eyebrow>
            <H2 className="mt-4">Holiday questions.</H2>
            <Link href="/corporate-gifting" className="mt-6 inline-block text-brass-deep underline underline-offset-8">Buying 10 or more? →</Link>
          </div>
          <FaqList items={giftFaqs} />
        </Container>
      </Section>
    </>
  );
}

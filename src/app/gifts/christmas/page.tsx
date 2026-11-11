import type { Metadata } from "next";
import Link from "next/link";
import { LampVisual } from "@/components/LampVisual";
import { LeadForm } from "@/components/LeadForm";
import { VideoDemo } from "@/components/VideoDemo";
import { BuyButtons } from "@/components/BuyButtons";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Container, Eyebrow, H2, Section } from "@/components/ui";
import type { Faq } from "@/lib/faqs";
import { formatINR, product, season } from "@/lib/site";

export const metadata: Metadata = {
  title: "Christmas gift for someone who loves their room (under ₹3,000)",
  description: `A cordless shake-to-reshape mood lamp in a keepsake gift box: a Christmas gift for her, him, a friend or Secret Santa. Order by ${season.orderBy}.`,
  alternates: { canonical: "/gifts/christmas" },
};

const giftFaqs: Faq[] = [
  { q: "What's a good Christmas gift under ₹3,000 for someone who loves home décor?", a: `A small, beautiful object they'll use every evening works best. MOTIFLO is a cordless mini mood lamp with a magnetic filament that changes shape when you shake it. It arrives gift-boxed with a note card at ${formatINR(product.price)}.` },
  { q: `When should I order for Christmas delivery?`, a: `Order by ${season.orderBy} for delivery before Christmas in most Indian cities. Confirm the delivery date when you order, or check the date shown on Amazon.in.` },
  { q: "Can I send it directly to the person?", a: "Yes. Share their address when you order and tell us your message. We write it on the gift note card and pack it in the box." },
  { q: "Is it good for Secret Santa at work?", a: "Yes: it's universal, desk-friendly and not too personal. For 10+ lamps, see Corporate Gifting for team pricing and a GST invoice." },
];

const forWho = [
  ["For her", "The friend whose room is always the cosiest, or the sister redoing her bedroom."],
  ["For him", "The desk-setup person. It's a fidget toy and a lamp in one."],
  ["For couples", "A shared bedside glow. Two lamps, two shapes."],
  ["For colleagues", "A Secret Santa gift that ends up on the desk, not in a drawer."],
];

export default function ChristmasGifts() {
  return (
    <>
      <JsonLd data={faqJsonLd(giftFaqs)} />
      <section className="night relative overflow-hidden bg-night text-ivory">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,rgba(255,180,90,0.18),transparent_70%)]" />
        <Container className="relative grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-glow/90">{season.name}</p>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] sm:text-7xl">A Christmas gift that glows a little differently.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/75">
              Looking for a gift under ₹3,000 for someone who loves their room, their desk or small beautiful things? MOTIFLO is a cordless mini mood lamp whose magnetic filament changes shape with a shake, and it arrives in a keepsake box, ready to give.
            </p>
            <p className="season-only mt-4 text-glow">Order by {season.orderBy} for Christmas delivery.</p>
            <div className="mt-8"><BuyButtons tone="dark" /></div>
          </div>
          <div className="flex justify-center"><LampVisual size="lg" initialShape={1} auto /></div>
        </Container>
      </section>

      <Section>
        <Container>
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <H2 className="mt-4 max-w-2xl">Thoughtful, without being too personal.</H2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {forWho.map(([t, d]) => (
              <div key={t} className="rounded-3xl bg-ivory p-7">
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container><VideoDemo /></Container>
      </Section>

      <Section className="bg-ivory">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Why it works as a gift</Eyebrow>
            <H2 className="mt-4">Easy to give. Easy to love.</H2>
          </div>
          <ul className="space-y-6">
            {[
              ["It's already wrapped", "Keepsake box and a gift note card. Write your message; we pack it in."],
              ["It gets used", "Bedside, desk or shelf, it earns a place every evening."],
              ["It's a conversation piece", "Everyone who sees it wants to shake it."],
              ["It's covered", "Battery-tested before dispatch, 1-year India replacement warranty."],
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
        <Container className="py-16"><div className="mx-auto max-w-2xl"><LeadForm tone="dark" title="Still deciding? Get one reminder before the order-by date." /></div></Container>
      </section>

      <Section>
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Gifting FAQ</Eyebrow>
            <H2 className="mt-4">Christmas questions.</H2>
            <Link href="/corporate-gifting" className="mt-6 inline-block text-brass-deep underline underline-offset-8">Buying 10 or more? →</Link>
          </div>
          <FaqList items={giftFaqs} />
        </Container>
      </Section>
    </>
  );
}

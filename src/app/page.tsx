import Link from "next/link";
import { LampVisual } from "@/components/LampVisual";
import { ChristmasVideo } from "@/components/ChristmasVideo";
import { LeadForm } from "@/components/LeadForm";
import { BuyButtons } from "@/components/BuyButtons";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Container, Eyebrow, H2, Section } from "@/components/ui";
import { productFaqs } from "@/lib/faqs";
import { product, season } from "@/lib/site";

const promises = [
  { t: "Battery-tested", d: "Every lamp is charged and run before it ships." },
  { t: "1-year replacement", d: "If it fails, we replace it. Message us, done." },
  { t: "Gift-boxed", d: "Keepsake box and gift note, ready to give." },
];

const features = [
  { t: "Shake to reshape", d: "A flexible LED filament held by magnets. Shake gently and it settles into a new shape. Every evening looks a little different." },
  { t: "Cordless", d: "Charge it, then place it anywhere: bedside, desk, bookshelf, dinner table." },
  { t: "Touch modes", d: "Tap the top for soft, bright or a slow breathing glow. Tap again to switch off." },
  { t: "Warm 2700K glow", d: "A candle-warm light that's gentle at night and easy on a dark room." },
  { t: "USB-C charging", d: "One cable, about three hours to a full charge." },
  { t: "Made to keep", d: "Clear shell, matte base, cleaning cloth included to keep it spotless." },
];

const places = [
  { t: "Bedside", d: "A soft light to fall asleep to, instead of a phone screen." },
  { t: "Desk", d: "Something beautiful to fidget with between calls." },
  { t: "Shelves", d: "A small glowing object that makes a corner feel finished." },
  { t: "Power cuts", d: "Cordless means it keeps glowing when the lights go out." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(productFaqs.slice(0, 5))} />

      {/* HERO */}
      <section className="night relative overflow-hidden bg-night text-ivory">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_45%,rgba(255,180,90,0.16),transparent_70%)]" />
        <Container className="relative grid items-center gap-x-12 gap-y-8 py-10 sm:py-20 md:grid-cols-[1.1fr_0.9fr]">
          <div className="md:col-start-1 md:row-start-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-glow/90">Shake-to-reshape mini mood lamp</p>
            <h1 className="mt-5 font-display text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
              Light, with a <em className="text-glow">little</em> movement.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/75">
              A palm-sized cordless lamp with a magnetic, flexible filament. Shake it and the glow takes a new shape. Small enough to gift, lovely enough to keep.
            </p>
            <div className="mt-9">
              <BuyButtons tone="dark" />
            </div>
          </div>
          {/* Lamp sits right after the CTA on phones, so the hook is visible on the first screen. */}
          <div className="flex justify-center md:col-start-2 md:row-span-2 md:row-start-1 md:justify-end">
            <LampVisual size="lg" auto />
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <ul className="grid gap-4 border-t border-ivory/10 pt-8 sm:grid-cols-3">
              {promises.map((p) => (
                <li key={p.t}>
                  <p className="font-medium text-ivory">{p.t}</p>
                  <p className="mt-1 text-sm text-ivory/60">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* VIDEO (Christmas spot with voiceover + music) */}
      <Section className="pb-0 sm:pb-0">
        <Container className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-xl">
            <Eyebrow>Watch it move</Eyebrow>
            <H2 className="mt-4">Twenty seconds. Sound on.</H2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              A gift box, a little light, and one shake. See why MOTIFLO is the present that ends up on their desk, not in a drawer.
            </p>
            <p className="mt-4 text-sm text-muted">Press <strong className="text-ink">🔊 Tap for sound</strong> on the video to hear the music and narration.</p>
          </div>
          <ChristmasVideo />
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <H2 className="mt-4">Three small gestures. One very different glow.</H2>
          </div>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Shake", d: "Give it a gentle shake. The magnetic filament loosens and settles into a new curve.", s: 0 },
              { n: "02", t: "Touch", d: "Tap the top to choose soft, bright or breathing. Tap again for off.", s: 2 },
              { n: "03", t: "Reset", d: "Hold it upright and sway it side to side. The filament snaps back straight.", s: 5 },
            ].map((step) => (
              <li key={step.n} className="night flex flex-col items-center rounded-3xl bg-night px-6 pb-8 pt-10 text-center text-ivory">
                <LampVisual size="sm" interactive={false} initialShape={step.s} />
                <p className="mt-6 text-xs tracking-[0.25em] text-glow/80">{step.n}</p>
                <p className="mt-2 font-display text-3xl">{step.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">{step.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* HONEST SIZE */}
      <Section className="bg-ivory">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Honest sizing</Eyebrow>
            <H2 className="mt-4">Mini, on purpose.</H2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              MOTIFLO is about <strong className="text-ink">14 cm tall and 7 cm wide</strong>. It fits in one hand and sits beside a coffee mug. It&apos;s a mood light for a bedside, desk or shelf, not a reading lamp for a whole room.
            </p>
            <p className="mt-4 max-w-md text-muted">We say this up front because &ldquo;smaller than I expected&rdquo; is the most common surprise with lamps like this. We&apos;d rather you know.</p>
          </div>
          <SizeDiagram />
        </Container>
      </Section>

      {/* FEATURES */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The details</Eyebrow>
            <H2 className="mt-4">Simple to use. Hard to stop playing with.</H2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="bg-ivory-soft p-8">
                <p className="font-display text-2xl">{f.t}</p>
                <p className="mt-3 leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* GIFT BOX */}
      <section className="night bg-ink text-ivory">
        <Container className="grid gap-12 py-20 sm:py-28 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-glow/90">{product.edition}</p>
            <H2 className="mt-4">Arrives ready to give.</H2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">
              No last-minute wrapping. Every MOTIFLO comes in a keepsake box with a gift note card you can write on, so it can go straight from the doorstep to their hands.
            </p>
            <Link href="/gifts/christmas" className="mt-8 inline-block text-glow underline underline-offset-8 hover:text-ivory">
              Christmas gift guide →
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 self-center">
            {product.inTheBox.map((i) => (
              <li key={i} className="rounded-2xl border border-ivory/12 bg-ivory/[0.03] px-5 py-6 text-sm text-ivory/85">
                <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-glow" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PROMISE */}
      <Section>
        <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Our promise</Eyebrow>
            <H2 className="mt-4">Tested before it&apos;s trusted.</H2>
          </div>
          <div className="space-y-8">
            {[
              ["Every battery is checked", "Each lamp is charged, switched through every mode and run before it's packed. Units that don't pass don't ship."],
              ["1-year India replacement", "If your lamp stops working in the first year, send us your order number and a short video. We'll send a replacement."],
              ["A real person replies", "Questions about charging, gifting or bulk orders go to a small team who answer, not a ticket queue."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-brass pl-6">
                <p className="text-xl font-medium">{t}</p>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PLACES */}
      <Section className="bg-ivory">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Where it belongs</Eyebrow>
            <H2 className="mt-4">Wherever a corner needs a little warmth.</H2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {places.map((p) => (
              <div key={p.t} className="rounded-3xl bg-ivory-soft p-7">
                <p className="font-display text-2xl">{p.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SEASON + CORPORATE */}
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {season.enabled && (
            <Link href="/gifts/christmas" className="season-only night group relative overflow-hidden rounded-3xl bg-night p-10 text-ivory">
              <div aria-hidden className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,190,105,0.35),transparent)]" />
              <p className="relative text-xs uppercase tracking-[0.22em] text-glow/90">{season.name}</p>
              <p className="relative mt-4 font-display text-4xl">{season.line}</p>
              <p className="relative mt-4 text-ivory/70">Order by {season.orderBy} for {season.occasion} delivery.</p>
              <p className="relative mt-8 text-glow group-hover:underline">Shop Christmas gifts →</p>
            </Link>
          )}
          <Link href="/corporate-gifting" className="group rounded-3xl border border-charcoal/12 bg-ivory p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-brass-deep">Teams & clients</p>
            <p className="mt-4 font-display text-4xl">Secret Santa, sorted.</p>
            <p className="mt-4 text-muted">10 or more lamps with your note card and a GST invoice. A gift people actually keep on their desk.</p>
            <p className="mt-8 text-brass-deep group-hover:underline">Corporate gifting →</p>
          </Link>
        </Container>
      </Section>

      {/* FIRST OWNERS (no fake reviews) */}
      <Section className="bg-ivory">
        <Container className="text-center">
          <Eyebrow>We&apos;re new</Eyebrow>
          <H2 className="mx-auto mt-4 max-w-3xl">No borrowed awards. No made-up reviews.</H2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            MOTIFLO is a young brand. Be one of our first owners, and tell us honestly what you think. Real reviews will appear here as they come in.
          </p>
        </Container>
      </Section>

      {/* REMINDER CAPTURE */}
      <section className="night bg-ink text-ivory">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl"><LeadForm tone="dark" /></div>
        </Container>
      </section>

      {/* FAQ */}
      <Section>
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2 className="mt-4">Good to know.</H2>
            <Link href="/faq" className="mt-6 inline-block text-brass-deep underline underline-offset-8">All FAQs</Link>
          </div>
          <FaqList items={productFaqs.slice(0, 5)} />
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="night bg-night text-ivory">
        <Container className="flex flex-col items-center py-20 text-center sm:py-28">
          <LampVisual size="md" interactive={false} initialShape={3} />
          <h2 className="mt-10 max-w-2xl font-display text-5xl leading-tight">A small light worth giving.</h2>
          <div className="mt-8"><BuyButtons tone="dark" /></div>
        </Container>
      </section>
    </>
  );
}

function SizeDiagram() {
  return (
    <figure className="rounded-3xl bg-ivory-soft p-8">
      <svg viewBox="0 0 420 300" role="img" aria-label="Size comparison: MOTIFLO is about 14 cm tall, a little taller than a coffee mug" className="w-full">
        <line x1="20" y1="260" x2="400" y2="260" stroke="#292723" strokeOpacity="0.25" />
        {/* lamp */}
        <rect x="90" y="70" width="66" height="160" rx="32" fill="#ffffff" stroke="#292723" strokeOpacity="0.35" />
        <path d="M123 82 C150 110 140 150 120 165 C100 180 104 214 123 228" stroke="#e7a54b" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="90" y="224" width="66" height="36" rx="9" fill="#8f8d88" />
        {/* height marker */}
        <line x1="60" y1="70" x2="60" y2="260" stroke="#8a6337" />
        <line x1="54" y1="70" x2="66" y2="70" stroke="#8a6337" />
        <line x1="54" y1="260" x2="66" y2="260" stroke="#8a6337" />
        <text x="44" y="170" fill="#8a6337" fontSize="14" textAnchor="middle" transform="rotate(-90 44 170)">≈ 14 cm</text>
        {/* mug */}
        <path d="M230 150 h78 v92 a18 18 0 0 1 -18 18 h-42 a18 18 0 0 1 -18 -18z" fill="#d8cfc1" />
        <path d="M308 168 h14 a20 20 0 0 1 0 40 h-14" fill="none" stroke="#d8cfc1" strokeWidth="10" />
        <text x="269" y="285" fill="#5f574d" fontSize="13" textAnchor="middle">coffee mug</text>
        <text x="123" y="285" fill="#5f574d" fontSize="13" textAnchor="middle">MOTIFLO</text>
        <text x="123" y="56" fill="#8a6337" fontSize="13" textAnchor="middle">≈ 7 cm wide</text>
      </svg>
    </figure>
  );
}

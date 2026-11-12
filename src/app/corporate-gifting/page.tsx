import type { Metadata } from "next";
import { CorporateForm } from "@/components/CorporateForm";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Corporate gifting & Secret Santa",
  description: "MOTIFLO mood lamps for teams and clients: 10+ units, volume pricing, your note card, one invoice, delivery to one office or every home address in the US.",
  alternates: { canonical: "/corporate-gifting" },
};

const perks = [
  ["10+ lamps", "Volume pricing on request for 10, 25, 50 or more."],
  ["Your message", "A printed note card with your company message (and logo, on request)."],
  ["One invoice", "A proper invoice for accounts, plus a W-9 on request."],
  ["Ship anywhere in the US", "To your office, or to each remote teammate's home."],
];

export default function Corporate() {
  return (
    <>
      <PageHeader eyebrow="Teams & clients" title="A desk gift people actually keep.">
        Holiday parties, Secret Santa, client thank-yous or onboarding kits. MOTIFLO is universal, beautiful on a desk and arrives gift-boxed.
      </PageHeader>
      <Section>
        <Container className="grid gap-14 md:grid-cols-2">
          <ul className="grid content-start gap-6 sm:grid-cols-2">
            {perks.map(([t, d]) => (
              <li key={t} className="rounded-3xl bg-ivory p-7">
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
          <CorporateForm />
        </Container>
      </Section>
    </>
  );
}

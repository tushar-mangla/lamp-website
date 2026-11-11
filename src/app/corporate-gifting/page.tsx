import type { Metadata } from "next";
import { CorporateForm } from "@/components/CorporateForm";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Corporate gifting & Secret Santa",
  description: "MOTIFLO mood lamps for teams and clients: 10+ units, your note card, GST invoice, delivery to one or many addresses across India.",
  alternates: { canonical: "/corporate-gifting" },
};

const perks = [
  ["10+ lamps", "Team pricing on request for 10, 25, 50 or more."],
  ["Your message", "A printed note card with your company message (and logo, on request)."],
  ["GST invoice", "Proper tax invoice for your accounts team."],
  ["Delivery your way", "To your office, or to each person's address."],
];

export default function Corporate() {
  return (
    <>
      <PageHeader eyebrow="Teams & clients" title="A desk gift people actually keep.">
        Secret Santa, Diwali, onboarding kits or client thank-yous. MOTIFLO is universal, beautiful on a desk and arrives gift-boxed.
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

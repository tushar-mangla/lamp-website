import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about your MOTIFLO lamp, an order, a replacement or bulk gifting. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const wa = whatsappLink("Hi MOTIFLO, I have a question:");
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to a real person.">
        Orders, replacements, gifting or bulk enquiries. We reply within one working day.
      </PageHeader>
      <Section>
        <Container className="grid gap-6 sm:grid-cols-2">
          <a href={`mailto:${site.email}`} className="rounded-3xl bg-ivory p-8 transition hover:bg-stone/50">
            <p className="text-sm text-muted">Email</p>
            <p className="mt-2 font-display text-3xl">{site.email}</p>
          </a>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-ivory p-8 transition hover:bg-stone/50">
              <p className="text-sm text-muted">WhatsApp</p>
              <p className="mt-2 font-display text-3xl">Message us</p>
            </a>
          ) : (
            <div className="rounded-3xl border border-dashed border-charcoal/20 p-8">
              <p className="text-sm text-muted">WhatsApp</p>
              <p className="mt-2 font-display text-3xl text-muted">Coming soon</p>
            </div>
          )}
          <div className="rounded-3xl border border-charcoal/12 p-8 sm:col-span-2">
            <p className="text-sm text-muted">For a replacement</p>
            <p className="mt-2 text-lg">Send your order number and a short video of the issue. That&apos;s all we need.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}

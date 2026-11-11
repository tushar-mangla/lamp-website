import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our story",
  description: "Why MOTIFLO exists: small lights, honest details, and gifts that get used.",
  alternates: { canonical: "/our-story" },
};

export default function OurStory() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Small lights. Honest details.">
        MOTIFLO started with a simple feeling: the right small light changes how a room feels at night.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
          {/* TODO(founder): replace with your real story: who you are, why this lamp, what you care about. */}
          <p>
            We fell for a lamp you can play with: a glowing filament that changes shape when you shake it. It made a desk feel calmer and a bedside feel warmer, and everyone who saw it wanted to pick it up.
          </p>
          <p>
            We also noticed what goes wrong with lamps like this: tiny surprises in size, batteries that give up, no one to call. So MOTIFLO is built around a few promises: we tell you the real size, we test every battery before it ships, and if something fails in the first year, we replace it.
          </p>
          <p className="font-display text-3xl italic text-ink">Light, with a little movement. That&apos;s the whole idea.</p>
        </Container>
      </Section>
    </>
  );
}

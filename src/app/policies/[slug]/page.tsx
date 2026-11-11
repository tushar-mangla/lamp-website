import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";
import { policies } from "@/lib/policies";

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = policies[slug];
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/policies/${slug}` } };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const p = policies[slug];
  if (!p) notFound();
  return (
    <>
      <PageHeader eyebrow="Policy" title={p.title}>{p.summary}</PageHeader>
      <Section>
        <Container className="max-w-3xl">
          {process.env.NODE_ENV !== "production" && (
            <p className="mb-8 rounded-xl bg-glow/30 px-4 py-3 text-sm">Draft: review with your CA/lawyer and fill the bracketed items before launch.</p>
          )}
          <div className="space-y-8">
            {p.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-3xl">{s.h}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted">
                  {s.p.map((t) => <p key={t}>{t}</p>)}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

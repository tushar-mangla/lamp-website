import type { Metadata } from "next";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/ui";
import { productFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Size, battery, touch modes, warranty, gifting and delivery: everything about the MOTIFLO mini mood lamp.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(productFaqs)} />
      <PageHeader eyebrow="Help" title="Frequently asked questions" />
      <Section><Container className="max-w-3xl"><FaqList items={productFaqs} /></Container></Section>
    </>
  );
}

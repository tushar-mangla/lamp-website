import type { Metadata } from "next";
import { LampVisual } from "@/components/LampVisual";
import { FaqList, faqJsonLd } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { MobileBuyBar } from "@/components/MobileBuyBar";
import { ProductBuy } from "@/components/ProductBuy";
import { WhyItCostsMore } from "@/components/WhyItCostsMore";
import { DeliveryInfo } from "@/components/DeliveryInfo";
import { VideoDemo } from "@/components/VideoDemo";
import { Container, Eyebrow, H2, Section } from "@/components/ui";
import { productFaqs } from "@/lib/faqs";
import { formatINR, media, product, shipping, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${product.name}: ${product.edition}`,
  description: `Cordless shake-to-reshape mini mood lamp with a magnetic LED filament. Battery-tested, gift-boxed, 1-year India replacement warranty. ${formatINR(product.price)} incl. GST.`,
  alternates: { canonical: "/lamp" },
};

const showVerify = process.env.NODE_ENV !== "production";

export default function LampPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${product.name} (${product.edition})`,
          sku: product.sku,
          brand: { "@type": "Brand", name: site.name },
          description: site.description,
          url: `${site.url}/lamp`,
          image: [`${site.url}${media.demo.squarePoster}`, `${site.url}${media.demo.widePoster}`],
          countryOfOrigin: product.countryOfOrigin,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: site.currency,
            availability: "https://schema.org/InStock",
            url: `${site.url}/lamp`,
            seller: { "@type": "Organization", name: site.name },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: { "@type": "MonetaryAmount", value: shipping.freeShipping ? 0 : shipping.feeInr, currency: site.currency },
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
                transitTime: { "@type": "QuantitativeValue", minValue: shipping.minDeliveryDays, maxValue: shipping.maxDeliveryDays, unitCode: "DAY" },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "IN",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: shipping.returnDays,
              returnMethod: "https://schema.org/ReturnByMail",
            },
          },
        }}
      />
      <JsonLd data={faqJsonLd(productFaqs)} />

      <section className="bg-ivory">
        <Container className="grid gap-10 py-10 sm:py-16 md:grid-cols-2 md:gap-16">
          <div className="night flex min-h-[420px] items-center justify-center rounded-[2rem] bg-night py-12 text-ivory md:sticky md:top-24 md:h-[calc(100dvh-8rem)] md:max-h-[680px]">
            <LampVisual size="lg" />
          </div>

          <div className="md:py-6">
            <Eyebrow>{product.edition}</Eyebrow>
            <h1 className="mt-3 font-display text-5xl leading-[1.02] sm:text-6xl">{product.name}</h1>
            <p className="mt-4 text-lg text-muted">Shake-to-reshape magnetic filament · cordless · warm 2700K</p>

            <p className="mt-8 flex items-baseline gap-3">
              <span className="text-3xl font-medium">{formatINR(product.price)}</span>
              {product.compareAt && <s className="text-muted">{formatINR(product.compareAt)}</s>}
              <span className="text-sm text-muted">incl. GST</span>
            </p>

            <p className="mt-1 text-xs text-muted">MRP {formatINR(product.mrp)} (incl. of all taxes) · Country of origin: {product.countryOfOrigin}</p>

            <ProductBuy />
            <DeliveryInfo />

            <ul className="mt-8 space-y-3 rounded-2xl bg-ivory-soft p-6 text-sm">
              <li>✦ <strong>Battery-tested</strong> before dispatch</li>
              <li>✦ <strong>1-year India replacement</strong> warranty</li>
              <li>✦ Keepsake <strong>gift box</strong> + gift note card</li>
              <li>✦ About <strong>14 cm tall</strong>: a mini mood light, not a reading lamp</li>
            </ul>

            <div className="mt-12">
              <H2 className="text-3xl sm:text-4xl">Specifications</H2>
              <dl className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4 text-sm sm:grid-cols-[10rem_1fr]">
                    <dt className="text-muted">{s.label}</dt>
                    <dd>
                      {s.value}
                      {showVerify && s.verify && (
                        <span className="ml-2 rounded bg-glow/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase">verify</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12">
              <H2 className="text-3xl sm:text-4xl">In the box</H2>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {product.inTheBox.map((i) => (
                  <li key={i} className="rounded-xl border border-charcoal/10 px-4 py-3">{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-ivory-soft">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <VideoDemo />
          <WhyItCostsMore />
        </Container>
      </Section>

      <Section className="pb-32 md:pb-28">
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2 className="mt-4">Before you order.</H2>
          </div>
          <FaqList items={productFaqs} />
        </Container>
      </Section>
      <MobileBuyBar />
    </>
  );
}

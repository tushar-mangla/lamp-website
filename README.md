# MOTIFLO website (US market)

Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4. All pages are statically prerendered, which suits SEO and AI-search crawlers.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit
| What | File |
|---|---|
| Price (USD), edition, colors, specs, in-the-box, checkout links (Shopify/Stripe per color), Amazon.com URL, email, seller, shipping, US compliance flags, season/order-by date | `src/lib/site.ts` |
| FAQs | `src/lib/faqs.ts` |
| Shipping / returns / warranty / privacy / terms drafts | `src/lib/policies.ts` (have them reviewed) |
| Pages | `src/app/**/page.tsx` |
| Lamp illustration (stand-in for photos) | `src/components/LampVisual.tsx` |

Specs marked `verify: true` show a yellow "verify" tag in dev builds. They come from the reference product; measure our units before launch.

## Pages
`/` home · `/lamp` product (Product + Offer + FAQ JSON-LD) · `/gifts/christmas` gift guide · `/corporate-gifting` inquiry form (posts to `/api/lead`, falls back to email) · `/our-story` · `/faq` · `/contact` · `/policies/{shipping,returns,warranty,privacy,terms}` · `sitemap.xml`, `robots.txt` (AI crawlers allowed), `/llms.txt` (generated from site.ts), generated OG image.

## Environment
Copy `.env.example` → `.env.local` (or set them in Vercel):
- `SITE_URL`: the real domain. Unset = `noindex` + robots disallow, so previews never get indexed under the wrong domain.
- `LEAD_WEBHOOK_URL`: receives reminder/corporate leads as JSON from `/api/lead`. Unset = forms fall back to a prefilled email.

## Pre-launch check
`npm run prelaunch` (or `SITE_URL=https://… npm run prelaunch`) lists every placeholder still blocking launch: checkout links, seller name/address, shipping terms, US compliance (FCC SDoC, UN 38.3, origin marking, Prop 65, sales tax), unverified specs, policy brackets, real photos/video.

## Demo video
The animated demo in `public/video/` is generated from `../marketing/video/motiflo-demo/` (`npm install && node render.mjs 1920 1080 out/x.mp4`). It's labelled as an animation on the site (`media.demo.isIllustration`); swap in real footage when you have it.

## Before launch
1. Fill `site.ts`: checkout links (Shopify product link or Stripe Payment Link per color), domain, Amazon.com URL, legal name + address. Until checkout links exist, the buy button is "Reserve yours" (prefilled email).
2. Add real product photos/video (put them in `public/` and use `next/image`).
3. Replace the Our Story text; get the policies reviewed.
4. Add analytics (GA4 / Vercel Analytics) and Amazon Attribution links.
5. Set the order-by date in `season` from your 3PL/carrier (USPS 2026: Ground Advantage Dec 17, Priority Dec 18).
6. Deploy (Vercel recommended).
# lamp-website

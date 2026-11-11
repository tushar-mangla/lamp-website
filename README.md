# MOTIFLO website

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
| Price, edition, colours, specs, in-the-box, links (Amazon, WhatsApp, email, domain), season/order-by date | `src/lib/site.ts` |
| FAQs | `src/lib/faqs.ts` |
| Shipping / returns / warranty / privacy / terms drafts | `src/lib/policies.ts` (have them reviewed) |
| Pages | `src/app/**/page.tsx` |
| Lamp illustration (stand-in for photos) | `src/components/LampVisual.tsx` |

Specs marked `verify: true` show a yellow "verify" tag in dev builds. They come from the reference product; measure our units before launch.

## Pages
`/` home · `/lamp` product (Product + Offer + FAQ JSON-LD) · `/gifts/christmas` gift guide · `/corporate-gifting` enquiry form (opens WhatsApp/email, no backend) · `/our-story` · `/faq` · `/contact` · `/policies/{shipping,returns,warranty,privacy,terms}` · `sitemap.xml`, `robots.txt` (AI crawlers allowed), `/llms.txt`, generated OG image.

## Environment
Copy `.env.example` → `.env.local` (or set them in Vercel):
- `SITE_URL`: the real domain. Unset = `noindex` + robots disallow, so previews never get indexed under the wrong domain.
- `LEAD_WEBHOOK_URL`: receives reminder/corporate leads as JSON from `/api/lead`. Unset = forms fall back to email/WhatsApp.

## Pre-launch check
`npm run prelaunch` (or `SITE_URL=https://… npm run prelaunch`) lists every placeholder still blocking launch: seller/GSTIN/grievance officer, WhatsApp, shipping terms, unverified specs, policy brackets, real photos/video.

## Demo video
The animated demo in `public/video/` is generated from `../marketing/video/motiflo-demo/` (`npm install && node render.mjs 1920 1080 out/x.mp4`). It's labelled as an animation on the site (`media.demo.isIllustration`); swap in real footage when you have it.

## Before launch
1. Fill `site.ts`: domain, WhatsApp number, Amazon URL, legal name. Confirm the price decision.
2. Add real product photos/video (put them in `public/` and use `next/image`).
3. Replace the Our Story text; get the policies reviewed.
4. Add analytics (GA4 / Vercel Analytics) and Amazon Attribution links.
5. Direct checkout (Razorpay/Cashfree) as a later phase: payment verification on the server via a route handler.
6. Deploy (Vercel recommended).
# lamp-website

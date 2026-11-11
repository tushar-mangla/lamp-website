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

## Before launch
1. Fill `site.ts`: domain, WhatsApp number, Amazon URL, legal name. Confirm the price decision.
2. Add real product photos/video (put them in `public/` and use `next/image`).
3. Replace the Our Story text; get the policies reviewed.
4. Add analytics (GA4 / Vercel Analytics) and Amazon Attribution links.
5. Direct checkout (Razorpay/Cashfree) as a later phase: payment verification on the server via a route handler.
6. Deploy (Vercel recommended).
# lamp-website

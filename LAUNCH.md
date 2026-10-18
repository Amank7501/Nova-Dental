# Launch checklist

Every placeholder that must be replaced before going live.

## Content and assets
- [ ] Replace all `/public/placeholders/*.jpg` with real clinic photos (hero, doctors, featured service, clinic gallery). Until they exist, components fall back to placehold.co images.
- [x] Phone, `phoneHref` and WhatsApp number set to +91 72095 50294.
- [ ] Replace `email` and `address` with real values in `src/data/site.ts`.
- [ ] Replace `site.mapEmbedUrl` with the real Google Maps embed URL (the map shows a grey fallback while it contains "PLACEHOLDER").
- [ ] Replace the placeholder doctors, testimonials, stats, `rating`, `reviewsSummary`, `since`, hours, landmarks and registration number in `src/data/site.ts`.
- [ ] Replace `src/app/icon.tsx` and `src/app/apple-icon.tsx` with real logo-based icons.
- [ ] Replace `/public/og-image.png` with a branded 1200×630 image (`node scripts/generate-og.ts` only fetches a placeholder).

## SEO and structured data
- [ ] Set the real domain in `site.url` (`src/data/site.ts`); metadata, canonical, sitemap, robots and JSON-LD all read it. The city is read from `site.address.city`.
- [ ] Replace `site.geo` latitude/longitude with real coordinates from Google Maps (currently `0.0`).
- [ ] Fill in `site.socials` (currently `#`); `sameAs` in the JSON-LD skips `#` entries.
- [ ] Submit `/sitemap.xml` to Google Search Console.
- [ ] Create and verify a Google Business Profile — far more important than this site for a local clinic's search visibility.

## Functionality
- [ ] Set up a form backend (Formspree, Resend, or a custom API route) and wire `AppointmentForm`'s `onSubmit` (see the `TODO` in `src/components/sections/AppointmentForm.tsx`).
- [ ] Add Google Analytics 4 or Plausible.
- [ ] Make the Privacy Policy links (`#`) point at a real page (create `/privacy` or link to an external policy).

## Deployment
- [ ] Register the domain, set up DNS, and deploy to Vercel or Netlify.

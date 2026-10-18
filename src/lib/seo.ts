import { site } from "@/data/site";

// City comes from site data; swap the real city/domain in src/data/site.ts.
const city = site.address.city;

export const siteTitle = `${site.name} — Trusted Dental Care in ${city}`;
export const siteDescription = `Modern dental clinic in ${city} offering gentle, specialist-led care — check-ups, root canal, implants, aligners, and more. Book an appointment online.`;
export const ogDescription = `Modern dental clinic in ${city} offering gentle, specialist-led care.`;
export const keywords = [
  `dentist in ${city}`,
  `dental clinic ${city}`,
  "root canal",
  "dental implants",
  "braces aligners",
  "pediatric dentist",
  "cosmetic dentistry",
];

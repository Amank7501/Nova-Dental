import { site } from "@/data/site";
import { getOpeningHoursSpecs } from "@/lib/openStatus";
import { siteDescription } from "@/lib/seo";

// Three JSON-LD blocks (Dentist, BreadcrumbList, FAQPage), rendered once from the root layout.
export function StructuredData() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": site.url,
    url: site.url,
    name: site.name,
    description: siteDescription,
    image: `${site.url}/og-image.png`,
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: getOpeningHoursSpecs(site.hours),
    sameAs: [site.socials.instagram, site.socials.facebook, site.socials.google].filter(
      (u) => u !== "#",
    ),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviewsSummary.rating,
      reviewCount: site.reviewsSummary.count,
    },
    medicalSpecialty: "Dentistry",
    availableService: site.services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      description: s.short,
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[dentist, breadcrumbs, faq].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // "<" escaped so content can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

export default StructuredData;

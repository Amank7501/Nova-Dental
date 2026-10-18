import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { site } from "@/data/site";

// Desktop (lg+) bento spans by index; first card is featured. Extras fall back to thirds.
const lgSpans = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function Services() {
  return (
    <section id="services" className="bg-surface-raised py-20 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              What we do
            </p>
            <h2
              className="mt-3 max-w-[20ch] font-display font-semibold leading-tight tracking-tight text-ink"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Care for every stage, every smile.
            </h2>
            <p className="mt-4 max-w-[48ch] text-slate-600">
              From routine check-ups to full-mouth rehabilitation — expert, honest
              treatment under one roof.
            </p>
          </div>
          <a
            href="#services"
            className="hidden items-center text-sm font-medium text-primary underline-offset-4 hover:underline lg:inline-flex"
          >
            View all services →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-12">
          {site.services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
              variant={i === 0 ? "featured" : "standard"}
              className={lgSpans[i] ?? "lg:col-span-4"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;

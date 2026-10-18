"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/data/site";
import { hoursSummary } from "@/lib/hours";

export function FAQ() {
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="bg-surface-raised py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Frequently asked
            </p>
            <h2
              className="mt-3 max-w-[16ch] font-display font-semibold leading-tight tracking-tight text-ink"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Questions, answered honestly.
            </h2>
            <p className="mt-5 max-w-[36ch] text-slate-600">
              Anything we didn&apos;t cover? Reach out and we&apos;ll give you a straight
              answer.
            </p>

            <div className="mt-8 rounded-2xl bg-primary/10 p-5">
              <p className="text-sm font-medium text-ink">Can&apos;t find your answer?</p>
              <p className="mt-2 flex gap-4 text-sm">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center text-primary underline underline-offset-2"
                >
                  Call us
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-primary underline underline-offset-2"
                >
                  WhatsApp
                </a>
              </p>
              <p className="mt-1 text-xs text-slate-600">{hoursSummary()}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue="faq-0">
              {site.faqs.map((f, i) => (
                <motion.div
                  key={f.q}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                >
                  <AccordionItem value={`faq-${i}`} className="border-border/60">
                    <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-ink hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pr-6 leading-relaxed text-ink/80">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;

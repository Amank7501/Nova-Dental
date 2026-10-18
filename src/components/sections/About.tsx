"use client";

import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Gallery } from "@/components/sections/Gallery";
import { site } from "@/data/site";
import { getIcon } from "@/lib/icons";

export function About() {
  const reduce = useReducedMotion();
  const { about } = site;

  return (
    <section id="about" className="overflow-hidden bg-surface-raised py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {about.eyebrow}
            </p>
            <h2
              className="mt-3 max-w-[14ch] font-display font-semibold leading-tight tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}
            >
              {about.heading}
            </h2>
            <p className="mt-5 max-w-[36ch] leading-relaxed text-ink">{about.body}</p>
          </div>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:col-span-7 lg:gap-x-6 lg:gap-y-10">
            {about.pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {createElement(getIcon(p.icon), { className: "size-6", "aria-hidden": true })}
                </span>
                <h4 className="mt-4 font-display text-lg font-semibold text-ink">
                  {p.title}
                </h4>
                <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-ink/70">
                  {p.desc}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <hr className="mx-auto my-16 max-w-[1200px] border-border lg:my-20" />

        <Gallery />
      </Container>
    </section>
  );
}

export default About;

"use client";

import { createElement, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { tints, type Service } from "@/data/site";
import { getIcon } from "@/lib/icons";
import { placeholder } from "@/lib/img";

function ServiceIcon({ name, className, strokeWidth }: { name: string; className?: string; strokeWidth?: number }) {
  return createElement(getIcon(name), { className, strokeWidth, "aria-hidden": true });
}

type Props = {
  service: Service;
  variant: "featured" | "standard";
  index: number;
  className?: string;
};

export function ServiceCard({ service, variant, index, className = "" }: Props) {
  const reduce = useReducedMotion();
  const tint = tints[service.tint];
  const featured = variant === "featured";
  const fallback = placeholder(800, 600, service.title);
  const [src, setSrc] = useState(service.image);

  const style = {
    "--t-bg": tint.bg,
    "--t-ink": tint.ink,
    "--t-accent": tint.accent,
  } as CSSProperties;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      className={className}
    >
      <motion.article
        style={style}
        initial="rest"
        whileHover={reduce ? undefined : "hover"}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
        className={`relative flex h-full overflow-hidden rounded-3xl bg-[var(--t-bg)] p-6 text-[color:var(--t-ink)] transition-shadow hover:shadow-soft lg:p-7 ${
          featured ? "flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 lg:p-10" : "flex-col"
        }`}
      >
        {/* Decorative oversized icon */}
        <motion.span
          aria-hidden
          variants={{ rest: { x: 0, y: 0 }, hover: { x: -6, y: -6 } }}
          className="pointer-events-none absolute -bottom-6 -right-6 text-[color:var(--t-ink)] opacity-10"
        >
          <ServiceIcon name={service.icon} className="size-40 scale-150" strokeWidth={1.25} />
        </motion.span>

        {featured && (
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-white/50 lg:w-1/2">
            <Image
              src={src}
              alt={`${service.title} at Nova Dental`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              onError={() => src !== fallback && setSrc(fallback)}
              ref={(img) => {
                if (img?.complete && img.naturalWidth === 0) setSrc(fallback);
              }}
              className="object-cover"
            />
          </div>
        )}

        <div className={`relative flex flex-1 flex-col ${featured ? "lg:justify-center" : ""}`}>
          <span
            className="flex size-11 items-center justify-center self-end rounded-full bg-white/60 text-[color:var(--t-accent)] backdrop-blur-sm data-[featured=true]:self-start"
            data-featured={featured}
          >
            <ServiceIcon name={service.icon} className="size-6" />
          </span>

          <h3
            className={`font-display font-semibold ${
              featured ? "mt-5 text-2xl lg:text-3xl" : "mt-10 text-2xl"
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`mt-2 text-sm opacity-80 ${featured ? "max-w-[44ch] lg:text-base" : "max-w-[28ch]"}`}
          >
            {service.short}
          </p>

          {featured && (
            <ul className="mt-5 space-y-2 text-sm lg:text-base">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="size-2 shrink-0 rounded-full bg-[color:var(--t-accent)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {featured ? (
            <Button asChild size="lg" className="mt-7 h-12 w-full px-8 sm:w-fit">
              <a href="#appointment">Book this service</a>
            </Button>
          ) : (
            <a
              href="#appointment"
              aria-label={`Learn more about ${service.title}`}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
            >
              Learn more →
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default ServiceCard;

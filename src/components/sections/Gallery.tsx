"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { Lightbox } from "@/components/common/Lightbox";
import { SafeImage } from "@/components/common/SafeImage";
import { site } from "@/data/site";
import { placeholder } from "@/lib/img";

// Spans only apply from md up; mobile is a uniform 2-col grid of squares.
const spanClass = {
  normal: "",
  wide: "md:col-span-2",
  tall: "lg:row-span-2",
} as const;

export function Gallery() {
  const reduce = useReducedMotion();
  const images = site.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-primary">
        Inside the clinic
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-ink lg:text-3xl">
        A space designed to put you at ease.
      </h3>
      <p className="mt-4 max-w-[48ch] text-slate-600">
        Modern equipment, warm lighting, and a layout built for calm — not a
        sterile corridor in sight.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-flow-dense md:grid-cols-3 md:gap-4 lg:auto-rows-[180px] lg:grid-cols-4">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            aria-label={`${img.alt}, open full-size`}
            onClick={() => setOpenIndex(i)}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: "easeOut" }}
            className={`group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:aspect-auto ${spanClass[img.span]}`}
          >
            <SafeImage
              src={img.src}
              fallback={placeholder(800, 800, img.alt)}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 md:group-hover:scale-105"
            />
            <span
              aria-hidden
              className="absolute inset-0 hidden items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
            >
              <ZoomIn className="size-8 text-white" />
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}

export default Gallery;

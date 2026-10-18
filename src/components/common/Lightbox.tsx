"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { placeholder } from "@/lib/img";

type Props = {
  images: { src: string; alt: string }[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const closeBtn =
  "[&>button:last-child]:right-3 [&>button:last-child]:top-3 [&>button:last-child]:z-10 [&>button:last-child]:flex [&>button:last-child]:size-11 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-full [&>button:last-child]:bg-white/15 [&>button:last-child]:text-white [&>button:last-child]:opacity-100 [&>button:last-child]:backdrop-blur [&>button:last-child]:hover:bg-white/25 [&>button:last-child_svg]:size-5";

const navBtn =
  "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex";

export function Lightbox({ images, openIndex, onClose, onPrev, onNext }: Props) {
  const open = openIndex !== null;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onPrev, onNext]);

  const img = open ? images[openIndex] : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        aria-label="Image lightbox"
        aria-describedby={undefined}
        className={`max-h-[90vh] max-w-[min(1100px,95vw)] gap-0 overflow-hidden border-none bg-black/95 p-0 sm:rounded-2xl ${closeBtn}`}
      >
        <DialogTitle className="sr-only">{img?.alt ?? "Gallery image"}</DialogTitle>
        {img && openIndex !== null && (
          <>
            <div
              className="relative h-[70vh] w-full touch-pan-y md:h-[78vh]"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)();
              }}
            >
              <SafeImage
                key={img.src}
                src={img.src}
                fallback={placeholder(1600, 1000, img.alt)}
                alt={img.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>

            <button type="button" aria-label="Previous image" onClick={onPrev} className={`${navBtn} left-4`}>
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button type="button" aria-label="Next image" onClick={onNext} className={`${navBtn} right-4`}>
              <ChevronRight className="size-6" aria-hidden />
            </button>

            <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-white">
              <p>{img.alt}</p>
              <p className="shrink-0 tabular-nums text-white/70" aria-live="polite">
                {openIndex + 1} / {images.length}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Lightbox;

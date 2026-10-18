"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & { src: string; fallback: string };

// next/image that swaps to a fallback URL when the source 404s (including errors
// that fired before hydration attached onError).
export function SafeImage({ src: initial, fallback, alt, ...rest }: Props) {
  const [src, setSrc] = useState(initial);
  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      onError={() => src !== fallback && setSrc(fallback)}
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0 && src !== fallback) setSrc(fallback);
      }}
    />
  );
}

export default SafeImage;

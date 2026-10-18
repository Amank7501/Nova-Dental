// placehold.co serves SVG by default, which next/image blocks; the /png segment forces a raster image.
export function placeholder(w: number, h: number, label = "Nova Dental") {
  return `https://placehold.co/${w}x${h}/0F766E/FFFFFF/png?text=${encodeURIComponent(label)}`;
}

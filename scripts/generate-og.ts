// Downloads a placeholder 1200x630 OG image to public/og-image.png.
// Run: node scripts/generate-og.ts   — replace the output with a branded image before launch.
import { writeFile } from "node:fs/promises";

const url = "https://placehold.co/1200x630/0F766E/FFFFFF/png?text=Novu+Dental";
const res = await fetch(url);
if (!res.ok) throw new Error(`placehold.co responded ${res.status}`);
await writeFile(new URL("../public/og-image.png", import.meta.url), Buffer.from(await res.arrayBuffer()));
console.log("Wrote public/og-image.png");

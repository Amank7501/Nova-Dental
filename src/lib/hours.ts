import { site } from "@/data/site";

// e.g. "Monday – Friday 9:00 AM – 8:00 PM · Saturday 9:00 AM – 6:00 PM · …"
export function hoursSummary() {
  return site.hours.map((h) => `${h.day} ${h.time}`).join(" · ");
}

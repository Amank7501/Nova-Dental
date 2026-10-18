export type SiteHours = { day: string; time: string }[];

export type OpenStatus = {
  isOpen: boolean;
  label: string;
  nextChange: string;
};

type Row = { days: number[]; open: number; close: number; openText: string; closeText: string };

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_KEYS = DAY_NAMES.map((d) => d.slice(0, 3).toLowerCase());

// "Monday – Friday" -> [1..5]; "Saturday" -> [6]; handles week wrap (e.g. Fri – Mon).
function parseDays(text: string): number[] {
  const parts = text
    .split(/[–—-]/)
    .map((p) => DAY_KEYS.indexOf(p.trim().slice(0, 3).toLowerCase()))
    .filter((i) => i >= 0);
  if (parts.length === 0) return [];
  if (parts.length === 1) return [parts[0]];
  const out: number[] = [];
  for (let d = parts[0]; ; d = (d + 1) % 7) {
    out.push(d);
    if (d === parts[1]) break;
  }
  return out;
}

// "9:00 AM – 8:00 PM (emergencies only)" -> first two times found.
function parseTimes(text: string) {
  const re = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi;
  const found = [...text.matchAll(re)];
  if (found.length < 2) return null;
  const toMin = (m: RegExpMatchArray) => {
    let h = Number(m[1]) % 12;
    if (m[3].toUpperCase() === "PM") h += 12;
    return h * 60 + Number(m[2] ?? 0);
  };
  const fmt = (m: RegExpMatchArray) => `${m[1]}:${m[2] ?? "00"} ${m[3].toUpperCase()}`;
  return { open: toMin(found[0]), close: toMin(found[1]), openText: fmt(found[0]), closeText: fmt(found[1]) };
}

function parseHours(hours: SiteHours): Row[] {
  const rows: Row[] = [];
  for (const h of hours) {
    const t = parseTimes(h.time);
    const days = parseDays(h.day);
    if (t && days.length) rows.push({ days, ...t });
  }
  return rows;
}

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// schema.org OpeningHoursSpecification entries. Rows without a time range (closed days) are skipped.
export function getOpeningHoursSpecs(hours: SiteHours) {
  return parseHours(hours).map((r) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: r.days.map((d) => DAY_NAMES[d]),
    opens: hhmm(r.open),
    closes: hhmm(r.close),
  }));
}

/**
 * Works out whether the clinic is open at `now` from `site.hours`.
 *
 * Each hours row is expected as `{ day: "Monday – Friday" | "Saturday", time: "9:00 AM – 8:00 PM" }`.
 * Any row whose `time` is NOT a "H:MM AM/PM – H:MM AM/PM" range (e.g. "Closed (emergencies only — call)")
 * is treated as CLOSED for those days. If that closed row mentions "emergenc", the label becomes
 * "Closed · Emergencies: call". Reads no clock itself: pass `now` from the browser.
 */
export function getOpenStatus(hours: SiteHours, now: Date): OpenStatus {
  const rows = parseHours(hours);
  const rowFor = (day: number) => rows.find((r) => r.days.includes(day));
  const today = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const todayRow = rowFor(today);

  if (todayRow && minutes >= todayRow.open && minutes < todayRow.close) {
    return { isOpen: true, label: "Open now", nextChange: `Closes at ${todayRow.closeText}` };
  }
  if (todayRow && minutes < todayRow.open) {
    return { isOpen: false, label: "Closed now", nextChange: `Opens today at ${todayRow.openText}` };
  }

  // Closed for the rest of today: either after hours, or a closed day (no time range).
  const closedRow = hours.find((h) => parseDays(h.day).includes(today));
  const emergency = !todayRow && !!closedRow && /emergenc/i.test(closedRow.time);
  const label = emergency ? "Closed · Emergencies: call" : "Closed now";

  for (let i = 1; i <= 7; i++) {
    const day = (today + i) % 7;
    const row = rowFor(day);
    if (row) {
      const when = i === 1 && todayRow ? "tomorrow" : DAY_NAMES[day];
      return { isOpen: false, label, nextChange: `Opens ${when} at ${row.openText}` };
    }
  }
  return { isOpen: false, label, nextChange: "" };
}

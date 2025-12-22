import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { specificEvents, generalPeriods } from "../src/data/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizeKeyword(s) {
  return s.toLowerCase().trim();
}

const specific = Object.entries(specificEvents).map(([date, e]) => ({
  id: `s_${date}`,
  kind: "specific",
  date,
  title: e.title,
  narrative: e.narrative,
  image: e.image,
  keywords: (e.keywords || []).map(normalizeKeyword),
}));

const general = generalPeriods.map(g => ({
  id: `g_${g.start}_${g.end}`,
  kind: "general",
  start: g.start,
  end: g.end,
  title: g.title,
  narrative: g.narrative,
  keywords: (g.keywords || []).map(normalizeKeyword),
}));

export const events = [...specific, ...general];

if (import.meta.url === `file://${process.argv[1]}`) {
  const outPath = path.join(__dirname, "events.json");
  fs.writeFileSync(outPath, JSON.stringify(events, null, 2));
  console.log(`✅ Wrote ${events.length} events to ${outPath}`);
}

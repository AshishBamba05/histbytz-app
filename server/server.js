import express from "express";
import cors from "cors";
import Fuse from "fuse.js";
import events from "./events.json" with { type: "json" };
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Fuse config
const fuse = new Fuse(events, {
  includeScore: true,
  threshold: 0.5,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: ["title", "keywords", "narrative"],
});

// --- API (FIRST) ---
app.get("/search", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  if (!q) return res.json({ results: [], suggestion: null });

  const hits = fuse.search(q);
  const strong = hits.filter(r => r.score <= 0.30).map(r => r.item);
  if (strong.length) return res.json({ results: strong, suggestion: null });

  const top = hits[0];
  const suggestion = top && top.score <= 0.70 ? top.item.title : null;
  return res.json({ results: [], suggestion });
});

// --- Serve React build ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../dist");

app.use(express.static(clientDist)); // static assets
app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html"))); // SPA fallback

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on :${PORT}`));

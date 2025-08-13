import express from "express";
import cors from "cors";
import Fuse from "fuse.js";
import events from "./events.json" with { type: "json" };
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

const fuse = new Fuse(events, {
  includeScore: true,
  threshold: 0.5,         // looser
  ignoreLocation: true,   // helps short queries
  minMatchCharLength: 2,
  keys: ["title", "keywords", "narrative"]
});

app.get("/", (_req, res) => res.send("OK"));

app.get("/search", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  console.log("GET /search", q);

  if (!q) return res.json({ results: [], suggestion: null });

  const hits = fuse.search(q);
  console.log("TOP HITS:", hits.slice(0, 5).map(h => ({ title: h.item.title, score: h.score })));

  const strong = hits.filter(r => r.score <= 0.30).map(r => r.item);
  if (strong.length) return res.json({ results: strong, suggestion: null });

  const top = hits[0];
  const suggestion = top && top.score <= 0.70 ? top.item.title : null;

  return res.json({ results: [], suggestion });
});


const PORT = process.env.PORT || 5050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../dist');

app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

app.listen(PORT, () => console.log(`✅ Server running on :${PORT}`));

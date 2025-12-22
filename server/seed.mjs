import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import Event from "./models/Event.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await connectDB(process.env.MONGODB_URI);

  const jsonPath = path.join(__dirname, "events.json");
  const events = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const ids = events.map(e => e.id).filter(Boolean);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate ids found");

  await Event.deleteMany({});
  await Event.insertMany(events, { ordered: true });

  console.log(`Seeded ${events.length} events`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

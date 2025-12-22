import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    kind: { type: String, required: true, enum: ["specific", "general"], index: true },

    date: { type: String },
    start: { type: String },
    end: { type: String },

    title: { type: String, required: true },
    narrative: { type: String, required: true },
    image: { type: String },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

EventSchema.index({ title: "text", narrative: "text", keywords: "text" });

export default mongoose.model("Event", EventSchema);

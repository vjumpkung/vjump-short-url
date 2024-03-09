import mongoose, { Schema } from "mongoose";

const UrlSchema = new Schema({
  user: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);

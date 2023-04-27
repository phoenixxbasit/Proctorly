import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new Schema({
  username: { type: String },
  results: { type: Array, default: [] },
  points: { type: Number, default: 0 },
  status: { type: String, default: "" },
  penalties: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const resultModel = mongoose.model("result", resultSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new Schema({
  username: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students"
  },
  results: { type: Array, default: [] },
  totalattempt: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  status: { type: String, default: "" },
  penalties: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const resultModel = mongoose.model("result", resultSchema);

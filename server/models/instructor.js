import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: "Instructor" }
});

export const instructorModel = mongoose.model("instructor", instructorSchema);

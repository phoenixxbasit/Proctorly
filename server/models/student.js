import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: "Student" }
});

export const studentModel = mongoose.model("student", studentSchema);

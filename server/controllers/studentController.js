import express from "express";
import { studentModel } from "../models/student.js";

const createstudent = async (req, res) => {
  const { username, password } = req.body;
  const user = await studentModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = new studentModel({ username, password });
  await newUser.save();
  res.json({ message: "Student registered successfully" });
};

const loginstudent = async (req, res) => {
  const { username, password } = req.body;

  const user = await studentModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  if (password !== user.password) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  res.status(200).json({ userID: user._id, username: user.username, type: user.type });
};

export { createstudent, loginstudent };

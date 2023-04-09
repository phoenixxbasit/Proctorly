import express from "express";
import { instructorModel } from "../models/instructor.js";

const createinstructor = async (req, res) => {
  const { username, password } = req.body;
  const user = await instructorModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = new instructorModel({ username, password });
  await newUser.save();
  res.json({ message: "Instructor registered successfully" });
};

const logininstructor = async (req, res) => {
  const { username, password } = req.body;

  const user = await instructorModel.findOne({ username });


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

export { createinstructor, logininstructor };

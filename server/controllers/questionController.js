import express from "express";
import { questionModel } from "../models/question.js";
import { questions as manyquestions } from "../database/data.js";

const getquestions = async (req, res) => {
  const questions = await questionModel.find();
  if (questions.length === 0) {
    return res.status(400).json({ message: "No Questions Found" });
  }
  res.json({ questions });
};

const insertquestion = async (req, res) => {
  const { question, options, answer, createdBy } = req.body;
  const q = await questionModel.findOne({ question });
  if (q) {
    return res.status(400).json({ message: "Question already exists" });
  }
  const newQestion = new questionModel({
    question,
    options,
    answer,
    createdBy,
  });
  await newQestion.save();
  res.json({ message: "Question Added successfully" });
};

const insertmanyquestions = async (req, res) => {
  try {
    const q = await questionModel.insertMany(manyquestions);
    res.json({ message: "Questions Added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await questionModel.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(400).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getquestions, insertquestion, insertmanyquestions, deleteQuestion };

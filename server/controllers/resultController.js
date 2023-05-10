import express from "express";
import { resultModel } from "../models/result.js";

const getresultbyusername = async (req, res) => {
  const { username } = req.params;
  const result = await resultModel.find({ username });
  console.log(result)
  if (result == null) {
    return res.status(400).json({ message: "No Result Found" });
  }
  res.json({ result });
};

const getresultbyid = async (req, res) => {
  const { id } = req.params;
  const result = await resultModel.find({ _id: id});
  console.log(result);
  if (!result || result.length === 0) {
    return res.status(404).json({ message: "No Result Found" });
  }
  res.json({ result });
};

const getresults = async (req, res) => {
  const results = await resultModel.find();
  if (results.length === 0) {
    return res.status(400).json({ message: "No Result Found" });
  }
  res.json({ results });
};

const insertresult = async (req, res) => {
  const { username } = req.body;
  const newResult = new resultModel({
    ...req.body,
  });
  await newResult.save();
  res.json({ message: "Result Added successfully" });
};

const deleteresult = async (req, res) => {
  const { id } = req.params;
  // Exception Handling
  try {
    const deletedResult = await resultModel.findByIdAndDelete(id);
    if (!deletedResult) {
      return res.status(400).json({ message: "Result not found" });
    }
    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getresultbyusername, getresultbyid, getresults, insertresult, deleteresult };

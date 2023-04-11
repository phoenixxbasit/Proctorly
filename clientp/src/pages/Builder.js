import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QuestionBuilder() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);
  const [createdBy, setCreatedBy] = useState("");

  // Insert new question to database
  const insertQuestion = async () => {
    const newQuestion = {
      question,
      options,
      answer,
      createdBy,
    };
    await axios.post("http://localhost:5000/api/question/insert", newQuestion);
    // Clear input fields
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer(0);
    setCreatedBy("");
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    insertQuestion();
  };

  // Handle option input change
  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  return (
    <div className="bg-black flex flex-col justify-start items-center py-6">
      <h1 className="text-white text-5xl font-bold justify-start items-center pb-3">
        Question Builder
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="mb-4">
          <label
            className="block text-gray-200 font-bold mb-2"
            htmlFor="question"
          >
            Question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="question"
            type="text"
            placeholder="Enter question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        {options.map((option, index) => (
          <div className="mb-4" key={index}>
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor={`option${index}`}
            >
              Option {index + 1}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`option${index}`}
              type="text"
              placeholder={`Enter option ${index + 1} here`}
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label
            className="block text-gray-200 font-bold mb-2"
            htmlFor="answer"
          >
            Answer (Enter the option number, starting from 0)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="answer"
            type="number"
            min="0"
            max={options.length}
            value={answer}
            onChange={(e) => setAnswer(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 font-bold mb-2"
            htmlFor="createdBy"
          >
            Created By
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="createdBy"
            type="text"
            placeholder="Enter your name here"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        <Link
          to="/instructor/questionarea"
          className="bg-green-500 text-white ml-6 py-2 px-4 rounded font-medium mr-4 text-center hover:bg-green-600 transition-colors duration-300"
        >
          Go Back
        </Link>
      </form>
    </div>
  );
}

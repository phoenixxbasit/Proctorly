import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QuestionBuilder() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch all questions from database
  const fetchQuestions = async () => {
    const response = await axios.get("http://localhost:5000/api/question/");
    setQuestions(response.data.questions);
  };

  return (
    <div className="bg-black flex flex-col justify-start items-center py-6">
      <h1 className="text-white text-5xl font-bold justify-start items-center pb-3">
        Questions
      </h1>
      <Link
        to="/instructor/builder"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8 block w-1/4 mx-auto text-center"
      >
        Question Builder
      </Link>
      <ul className="w-full max-w-xl">
        {questions.map((question, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow-md mb-4 p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <p>
              <span className="font-bold">Question:</span> {question.question}
            </p>
            <p>
              <span className="font-bold">Options:</span>{" "}
              {question.options.join(", ") || "None"}
            </p>
            <p>
              <span className="font-bold">Answer:</span> {question.answer}
            </p>
            <p>
              <span className="font-bold">CreatedBy:</span> {question.createdBy}
            </p>
            <p>
              <span className="font-bold">Created At:</span>{" "}
              {new Date(question.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <Link
        to="/instructor/main"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 mb-8 block w-1/4 mx-auto text-center transition-colors duration-300"
      >
        Go To Main
      </Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Main() {
  const user = useSelector((state) => state.user);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const response = await axios.get(
        `http://localhost:5000/api/result/${user.username}`
      );
      console.log(response.data);
      setResults(response.data.result);
    }
    fetchResults();
  }, [user.username]);

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <ToastContainer />
      <Link
        to="/"
        className="absolute top-0 right-0 m-5 bg-green-500 text-white px-6 py-3 rounded-md font-medium mr-4 text-center hover:bg-green-600 transition-colors duration-300"
      >
        Logout
      </Link>
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex justify-center">
          <Link
            to="/quiz"
            className="bg-green-500 text-white px-6 py-2 rounded-md font-medium w-full max-w-md text-center"
          >
            Start Exam
          </Link>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Previous Results</h2>
          <ul className="list-disc list-inside">
            {results.map((result, index) => (
              <li
                key={index}
                className="mb-2 hover:bg-gray-700 rounded-md p-3 cursor-pointer transition-colors duration-300"
              >
                <Link to={`/result/${result._id}`}>
                  <span className="font-bold">Exam {index + 1}:</span> Score{" "}
                  {result.points}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow flex flex-col bg-black">
        <div className="flex-1 flex flex-row justify-center items-center">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Quiz App Logo"
              className="w-40 h-40 mb-1 mr-3"
            />
            <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white">
              <span className="block">Welcome</span>
              <span className="block whitespace-pre-wrap text-center">
                {user.username}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

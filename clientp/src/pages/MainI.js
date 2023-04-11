import React from "react";
import logo from "../assets/Logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Main() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <Link to="/" className="absolute top-0 right-0 m-5 bg-green-500 text-white px-6 py-3 rounded-md font-medium mr-4 text-center hover:bg-green-600 transition-colors duration-300">
        Logout
      </Link>
      <div className="flex flex-col items-center mb-16">
        <img src={logo} alt="Quiz App Logo" className="w-40 h-40 mb-4" />
        <h1 className="text-5xl font-bold mb-5">Welcome, {user.username}!</h1>
        <div className="flex flex-row">
          <Link
            to="/instructor/questionarea"
            className="bg-green-500 text-white px-6 py-3 rounded-md font-medium mr-4 text-center hover:bg-green-600 transition-colors duration-300"
          >
            Manage Questions
          </Link>
          <Link
            to="/instructor/result"
            className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-600 transition-colors duration-300"
          >
            View Results
          </Link>
        </div>
      </div>
    </div>
  );
}

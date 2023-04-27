import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setType, setUserId, setUsername as susername } from "../redux/user_reducer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function LoginI() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [_, setCookies] = useCookies(["userID"]);
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/intructor/login`, {
        username,
        password,
      });
      setCookies("userID", response.data.userID);
      window.localStorage.setItem("username", response.data.username);
      console.log(response.data)
      dispatch(setUserId(response.data.userID));
      dispatch(susername(response.data.username));
      dispatch(setType("Instructor"));
      navigate("/instructor/main");

    } catch (error) {
      alert("Invalid username or password");
      console.error(error);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-md mx-auto pt-28 pb-10 px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <img src={logo} alt="My App Logo" className="w-24 h-24" />
            <h1 className="text-white text-4xl font-bold ml-3">Proctorly</h1>
          </div>
        </div>
        <form className="mt-10" onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              className="block text-gray-400 font-medium text-lg mb-3"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-gray-600 w-full py-3 px-3 text-gray-200 rounded-md bg-black"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 font-medium text-lg mb-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-600 w-full py-3 px-3 mb-3 text-gray-200 rounded-md bg-black"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-800 text-white py-3 px-6 rounded-md font-semibold text-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
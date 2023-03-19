import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'
import { Link } from 'react-router-dom';
import logo from '../Logo.png';

export default function Login() {

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  function getName() {
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
    }
  }
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-md mx-auto pt-28 pb-10 px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            {<img src={logo} alt="My App Logo" className="w-24 h-24" />}
            <h1 className="text-white text-4xl font-bold ml-3">Proctorly</h1>
          </div>
        </div>
        <form className="mt-10" >
          <div className="mb-6">
          <label className="block text-gray-400 font-medium text-lg mb-3" htmlFor="username">
            Username
          </label>
          <input
            className="border border-gray-600 w-full py-3 px-3 text-gray-200 rounded-md bg-black"
            id="username"
            type="text"
            placeholder="Enter your username"
            ref={inputRef}
          />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 font-medium text-lg mb-3" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-600 w-full py-3 px-3 mb-3 text-gray-200 rounded-md bg-black"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Link to="/main" onClick={getName} className="bg-gradient-to-r from-green-500 to-blue-800 text-white py-3 px-6 rounded-md font-semibold text-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import logo from '../Logo256.png';
import { useSelector } from 'react-redux';
import { selectUserId } from '../redux/result_reducer';
import { Link } from 'react-router-dom';

export default function Main() {
    const userId = useSelector(selectUserId);
  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 flex justify-center">
      <Link to="/quiz" className="bg-green-500 text-white px-6 py-2 rounded-md font-medium w-full max-w-md text-center">
        Start Exam
      </Link>
      </div>
        <div className="p-6 flex-grow overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Previous Results</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">
              <span className="font-bold">Exam 1:</span> 90%
            </li>
            <li className="mb-2">
              <span className="font-bold">Exam 2:</span> 80%
            </li>
            <li className="mb-2">
              <span className="font-bold">Exam 3:</span> 70%
            </li>
            <li className="mb-2">
              <span className="font-bold">Exam 4:</span> 85%
            </li>
            <li className="mb-2">
              <span className="font-bold">Exam 5:</span> 95%
            </li>
          </ul>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow flex flex-col bg-black">
        <div className="flex-1 flex flex-row justify-center items-center">
          { <img src={logo} alt="Quiz App Logo" className="w-40 h-40 mb-1" /> }  
          <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white ml-7">
            Welcome {userId}!
          </h1>
        </div>
      </div>
    </div>
  );
}

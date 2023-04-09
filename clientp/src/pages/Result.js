import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      const response = await axios.get(`http://localhost:5000/api/result/id/${id}`);
      setResult(response.data.result[0]);
    }
    fetchResult();
  }, [id]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl justify-center items-center font-bold mb-8 text-white">Exam Results</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
          <p className="text-lg font-bold mb-4"><span className="font-bold text-gray-700">Score:</span> {result.points}</p>
          <p className="text-lg font-bold mb-4"><span className="font-bold text-gray-700">Status:</span> {result.status}</p>
        </div>
        <h2 className="text-2xl font-bold mb-8 text-white">Results:</h2>
        <ul>
          {result.results.map((question, index) => (
            <li key={index} className="mb-8">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <p className="text-lg font-bold mb-2">Question {index+1}</p>
                <p className="text-lg mb-2"><span className="font-bold text-gray-700">Your Answer:</span> {question === "R"?"Correct":"Wrong"}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/main" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 block w-1/4 mx-auto text-center">Back to Main</Link>
      </div>
    </div>
  );
}

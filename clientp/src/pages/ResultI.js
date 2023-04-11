import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const response = await axios.get("http://localhost:5000/api/result");
      setResults(response.data.results);
    }
    fetchResults();
  }, []);

  return (
    <div className="bg-black flex flex-col justify-start items-center py-6">
      <h1 className="text-white text-5xl font-bold justify-start items-center pb-3">
        Results
      </h1>
      <ul className="w-full max-w-md">
        {results.map((result, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow-md mb-4 p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <p>
              <span className="font-bold">Username:</span> {result.username}
            </p>
            <p>
              <span className="font-bold">Points:</span> {result.points}
            </p>
            <p>
              <span className="font-bold">Status:</span> {result.status}
            </p>
            <p>
              <span className="font-bold">Penalties:</span>{" "}
              {result.penalties.join(", ") || "None"}
            </p>
            <p>
              <span className="font-bold">Results:</span>{" "}
              {
                result.results.reduce(
                  (acc, curr) => {
                    if (curr === "R") {
                      acc.right += 1;
                    } else if (curr === "W") {
                      acc.wrong += 1;
                    }
                    return acc;
                  },
                  { right: 0, wrong: 0 }
                ).right
              }
              : Right{" "}
              {
                result.results.reduce(
                  (acc, curr) => {
                    if (curr === "R") {
                      acc.right += 1;
                    } else if (curr === "W") {
                      acc.wrong += 1;
                    }
                    return acc;
                  },
                  { right: 0, wrong: 0 }
                ).wrong
              }
              : Wrong
            </p>

            <p>
              <span className="font-bold">Created At:</span>{" "}
              {new Date(result.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <Link to="/instructor/main" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 block w-1/4 mx-auto text-center">Back to Main</Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushResultAction } from "../redux/result_reducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lencheat, setlencheat] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [t, sett] = useState(Date.now() + 120000);
  const user = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let newCheating;
  const maxCheat = 30;
  console.log(user);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/question`
      );
      const QuizQuestions = [...res.data.questions].sort(
        () => Math.random() - 0.5
      );
      setQuestions(QuizQuestions);
      setLoading(false);
    };
    fetchQuestions();
    document.addEventListener("visibilitychange", handleTabSwitch, false);
    return () => {
      // Remove event listener for the visibilitychange event
      document.removeEventListener("visibilitychange", handleTabSwitch);
    };
  }, []);

  const handleTabSwitch = async () => {
    if (document.visibilityState === "visible")
      await axios.get("http://localhost:5002/detecttab");
  };


  useEffect(() => {
    const interval = setInterval(() => {
      handleDetect();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [lencheat]);

  const handleDetect = async () => {
    const res = await axios.get("http://localhost:5002/detect");
    newCheating = res.data;

    if (newCheating.length > lencheat) {
      let newCheats = newCheating.slice(lencheat);
      newCheats.map((value, index) =>
        toast.warn(`${value} is detected ${lencheat + index}/${maxCheat}`, {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
          onClose: () => {
            if ((newCheating.length > maxCheat) &&(index === (newCheats.length -1))) {
              alert(`Ending Exam Due to ${newCheating.length} Cheating Penalties`);
              handleSubmit(true);
            }
          }
        })
      );
    }
    console.log(lencheat, newCheating);
    setlencheat(() => newCheating.length);
    
  };

  const handleAnswer = (answerIndex) => {
    setUserAnswers([...userAnswers, answerIndex]);
  };

  const generateResult = (userAnswers, cheatstatus = false) => {
    const result = {
      username: user,
      results: [],
      points: 0,
      status: "",
      penalties: [],
    };

    userAnswers.forEach((userAnswer, index) => {
      const question = questions[index];
      const isCorrect = userAnswer === question.answer;
      result.results.push(isCorrect ? "R" : "W");
      if (isCorrect) {
        result.points += 1;
      }
    });

    const unansweredQuestions = questions.length - userAnswers.length;
    for (let i = 0; i < unansweredQuestions; i++) {
      result.results.push("W");
    }

    result.penalties = newCheating;
    if (cheatstatus) {
      result.status = "Failed (Cheated)";
    } else {
      result.status =
        result.points / questions.length >= 0.5 ? "Passed" : "Failed";
    }

    return result;
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      const radioButtons = document.getElementsByName("answer");
      for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
      }
    }
  };

  const handleSubmit = async (cheatstatus = false) => {
    setFinished(true);
    const result = generateResult(userAnswers, cheatstatus);
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/insert`,
      result
    );
    dispatch(pushResultAction(result));
    navigate("/main");
    console.log(res.data);
  };

  const currentQuestion = questions[currentIndex];
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up! Submitting your answers...</span>;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  if (loading) {
    // Only render the component if loading is false
    return (
      <div className="flex justify-center items-center h-screen text-6xl font-bold bg-black text-white">
        Your Exam Is Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <ToastContainer />

      <div className="text-6xl mb-6 font-bold">
        <Countdown date={t} renderer={renderer} onComplete={handleSubmit} />
      </div>
      {finished ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-6xl font-bold mb-6 question">
            Submit Your Answers
          </h2>
          <button
            className="bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h2 className="text-3xl font-bold mb-6 question">
            {currentQuestion.question}
          </h2>
          {currentQuestion.options.map((option, index) => (
            <label className="flex items-center mb-4" key={index}>
              <input
                type="radio"
                name="answer"
                className="mr-2"
                onChange={() => handleAnswer(index)}
              />
              <span>{option}</span>
            </label>
          ))}
          <div className="flex justify-start items-center">
            <button
              className="bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all duration-200 mr-4"
              onClick={handleNext}
            >
              Next
            </button>
            <button
              className="bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all duration-200"
              onClick={() => setFinished(true)}
            >
              Finish Early
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;

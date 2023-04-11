import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/** import components */
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginI from "./pages/LoginI";
import Main from "./pages/Main";
import MainI from "./pages/MainI";
import Quiz from "./pages/Quiz";
import QuestionArea from "./pages/QuestionArea";
import Builder from "./pages/Builder";
import Result from "./pages/Result";
import ResultI from "./pages/ResultI";

function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/instructor/login" element={<LoginI />} />
      <Route path="/main" element={<Main />} />
      <Route path="/instructor/main" element={<MainI />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/instructor/questionarea" element={<QuestionArea />} />
      <Route path="/instructor/builder" element={<Builder />} />
      <Route path="/result/:id" element={<Result />} />
      <Route path="/instructor/result" element={<ResultI />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
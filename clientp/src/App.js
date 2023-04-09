import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/** import components */
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginI from "./pages/LoginI";
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/instructor/login" element={<LoginI />} />
      <Route path="/main" element={<Main />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result/:id" element={<Result />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
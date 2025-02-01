import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QuizInfoProvider, useQuiz } from "./Context/QuizContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <QuizInfoProvider>
        <App />
      </QuizInfoProvider>
    </Router>
  </StrictMode>
);

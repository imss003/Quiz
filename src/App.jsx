import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import InstructionsPage from "./Pages/InstructionsPage";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";
import LeaderBoardPage from "./Pages/LeaderBoardPage";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Route>
    </Routes>
  );
};

export default App;

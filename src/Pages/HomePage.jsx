import React, { useState } from "react";
import { useQuiz } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { title, titleloading, setName } = useQuiz();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.trim() === "") return;
    
    sessionStorage.setItem("username", userName); 
    setName(userName);

    navigate("/instructions");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {!titleloading && (
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          {title} Quiz
        </h1>
      )}

      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center max-w-lg">
        Test your knowledge and challenge yourself with our interactive quiz!
      </p>

      <form className="text-xl text-gray-300 mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <p>Enter your name and start the quiz: </p>
        <input
          type="text"
          className="p-2 text-black rounded-md"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className={`px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform ${
            userName.trim()
              ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!userName.trim()}
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default HomePage;

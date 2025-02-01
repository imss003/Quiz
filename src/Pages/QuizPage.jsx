import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../Context/QuizContext";

const QuizPage = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const { score, setScore, questions, loading, setTime } = useQuiz();
  const [clickedOption, setClickedOption] = useState(-1);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
  const [optionDisabled, setOptionDisabled] = useState(false);
  const navigate = useNavigate();

  const totalTime = questions.length * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (loading || questions.length === 0) return;

    const savedTimeLeft = sessionStorage.getItem("timeLeft");
    const initialTimeLeft = savedTimeLeft ? parseInt(savedTimeLeft) : questions.length * 60;
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleQuizSubmit();
          return 0;
        }
        sessionStorage.setItem("timeLeft", prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, questions.length]);

  const handleQuizSubmit = () => {
    setTime(totalTime - timeLeft);

    const username = sessionStorage.getItem("username");
    sessionStorage.clear();
    if (username) {
      sessionStorage.setItem("username", username);
    }

    navigate("/result");
  };

  const handleOptionClick = (questionIndex, optionIndex) => {
    const currentQuestion = questions[questionIndex];
    const selectedOption = currentQuestion.options[optionIndex];

    if (selectedOption.is_correct) {
      setScore(score + 1);
      setCorrectAnswerIndex(-1); 
    } else {
      setScore(score - 0.25);
      const correctIndex = currentQuestion.options.findIndex(opt => opt.is_correct);
      setCorrectAnswerIndex(correctIndex);
    }

    setClickedOption(optionIndex);
    setOptionDisabled(true);
  };

  useEffect(() => {
    const question = String(questionNumber);
    const Answer = String(clickedOption);
    sessionStorage.setItem(question, Answer);
  }, [clickedOption]);

  useEffect(() => {
    const answerToBeSearched = sessionStorage.getItem(String(questionNumber));
    if (answerToBeSearched) {
      setClickedOption(parseInt(answerToBeSearched));
    } else {
      setOptionDisabled(false);
      setClickedOption(-1);
      setCorrectAnswerIndex(-1);
    }
  }, [questionNumber]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {loading ? (
        <p className="text-xl font-semibold">Loading...</p>
      ) : questions.length === 0 ? (
        <p className="text-xl font-semibold">No questions found.</p>
      ) : (
        <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Question {questionNumber}</h1>
            <p className="text-lg font-semibold bg-red-600 px-3 py-1 rounded">
              ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>

          <h2 className="text-xl font-medium mb-4">
            {questions[questionNumber - 1]?.description}
          </h2>

          <ul className="space-y-3">
            {questions[questionNumber - 1]?.options.map((option, ind) => (
              <li
                key={ind}
                className={`cursor-pointer border-2 p-3 rounded-md transition-all duration-300 ${
                  clickedOption === ind && option.is_correct
                    ? "bg-green-600"
                    : clickedOption === ind && !option.is_correct
                    ? "bg-red-600"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  if (!optionDisabled) {
                    handleOptionClick(questionNumber - 1, ind);
                  }
                }}
                aria-disabled={optionDisabled}
              >
                {ind + 1}. {option.description}
              </li>
            ))}
          </ul>

          {correctAnswerIndex !== -1 && (
            <p className="mt-4 text-lg font-semibold text-green-400">
              Correct Answer: {questions[questionNumber - 1]?.options[correctAnswerIndex]?.description}
            </p>
          )}

          <div className="w-full flex justify-between mt-6">
            <div className="w-[50%] h-fit">
            {questionNumber > 1 && (
              <button
                className="bg-gray-700 text-white px-5 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-black"
                onClick={() => setQuestionNumber(questionNumber - 1)}
              >
                Previous
              </button>
            )}
            </div>
            {questionNumber < questions.length ? (
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700"
                onClick={() => setQuestionNumber(questionNumber + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-600 text-white px-5 py-2 rounded-lg transition-all duration-200 hover:bg-green-700"
                onClick={handleQuizSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

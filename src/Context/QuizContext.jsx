import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const QuizContext = createContext();

export const QuizInfoProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('no title');
  const [titleloading, setTitleLoading] = useState(true);
  const [name, setName] = useState(sessionStorage.getItem("username") || "");
  const [time, setTime] = useState(0);

  useEffect(() => {
    axios
      .get("/api/Uw5CrX#")
      .then((r) => {
        if (r.data.questions) {
          setQuestions(r.data.questions);
          console.log("title is: ", r.data.title);
          setTitle(r.data.title);
          setTitleLoading(false);
        } else {
          console.error("No questions found in response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const submitQuiz = (finalScore) => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    results.push({ name, score: finalScore, time });
    localStorage.setItem("results", JSON.stringify(results));
    
    sessionStorage.removeItem("username");
    setName("");
  };

  return (
    <QuizContext.Provider value={{ score, setScore, questions, loading, title, setTitle, titleloading, setTitleLoading, name, setName, time, setTime, submitQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};

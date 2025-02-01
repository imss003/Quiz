import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const InstructionsPage = () => {
  const navigate = useNavigate();
  const emojiRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const emoji = emojiRef.current;

    button.addEventListener("mouseenter", () => {
      gsap.to(emoji, {
        y: -15,
        x: 15,
        rotation: 10,
        repeat: 1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.5,
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(emoji, {
        y: 0,
        x: 0,
        rotation: 0,
        duration: 0.3,
      });
    });

    return () => {
      button.removeEventListener("mouseenter", () => {});
      button.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Instructions
        </h1>
        <ul className="list-disc list-inside space-y-3 text-lg">
          <li>
            There will be a total of{" "}
            <span className="font-semibold text-blue-300">10 questions</span>.
          </li>
          <li>Each question will have four options, only one being correct.</li>
          <li>You need to choose the correct option for each question.</li>
          <li>
            <span className="font-semibold text-green-400">+1 point</span> for
            correct answers,{" "}
            <span className="font-semibold text-red-400">-0.25 points</span> for
            incorrect ones.
          </li>
          <li>Try to answer quickly as there's a time limit per question.</li>
          <li>
            Skipping a question won’t deduct points but won’t add any either.
          </li>
          <li>Your total score will be displayed at the end.</li>
          <li className="font-semibold text-yellow-300">Good luck! 🎯</li>
        </ul>

        <div className="flex justify-center mt-8">
          <button
            ref={buttonRef}
            onClick={() => navigate("/quiz")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-700 flex items-center gap-2 hover:scale-105"
          >
            Start Quiz{" "}
            <span ref={emojiRef} className="emoji inline-block">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;

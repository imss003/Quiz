import React from 'react';
import { useQuiz } from '../Context/QuizContext';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const { score, setScore, name, time, setTime, setName } = useQuiz();
    const navigate = useNavigate();
    
    console.log("name is:", name, "time is:", time, "score is:", score);

    const handleRestart = () => {
        setScore(0); 
        setTime(0);
        setName("");
        navigate('/quiz'); 
    };

    const handleLeaderboard = () => {
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push({ name, score, time });
        localStorage.setItem("results", JSON.stringify(results));
        setScore(0); 
        setTime(0);
        setName("");
        sessionStorage.removeItem("username");
        navigate('/leaderboard');
    }

    return (
        <div className="bg-black min-h-screen w-full text-white flex flex-col items-center justify-center p-8">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-4xl font-bold text-center mb-4">Quiz Completed!</h1>
                <p className="text-xl text-center mb-6">
                    Congratulations on completing the quiz. Here's your score:
                </p>
                
                <div className="text-6xl font-semibold text-center mb-8">
                    <span className="text-green-500">Score: </span>{score} / 10
                </div>

                <p className="text-xl text-center mb-6">
                    <span className="text-yellow-400">Time Taken: </span> {time} seconds
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-blue-600 text-white p-4 rounded-md text-lg hover:bg-blue-700 transition-all duration-300"
                        onClick={handleRestart}
                    >
                        Restart Quiz
                    </button>
                    <button
                        className="bg-gray-700 text-white p-4 rounded-md text-lg hover:bg-gray-600 transition-all duration-300"
                        onClick={() => navigate('/')}
                    >
                        Go to Home
                    </button>
                    <button
                        className="bg-gray-700 text-white p-4 rounded-md text-lg hover:bg-gray-600 transition-all duration-300"
                        onClick={handleLeaderboard}
                    >
                        Save to Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;

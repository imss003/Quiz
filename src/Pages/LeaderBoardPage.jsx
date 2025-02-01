import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LeaderBoardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    results.sort((a, b) => b.score - a.score || a.time - b.time);
    setLeaderboard(results);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">🏆 Leaderboard</h1>
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        {leaderboard.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3">Rank</th>
                <th className="p-3">Name</th>
                <th className="p-3">Score</th>
                <th className="p-3">Time (sec)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="p-3 font-bold">#{index + 1}</td>
                  <td className="p-3">{entry.name}</td>
                  <td className="p-3 font-semibold text-green-400">{entry.score}</td>
                  <td className="p-3 text-yellow-300">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg">No scores yet. Play a quiz to appear here! 🎯</p>
        )}
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default LeaderBoardPage;

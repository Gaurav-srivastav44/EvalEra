import React from "react";
import { FaMedal, FaTrophy } from "react-icons/fa";

const data = [
  { id: 1, name: "Gaurav Srivastav", score: 980 },
  { id: 2, name: "Aditi Sharma", score: 850 },
  { id: 3, name: "Rahul Mehta", score: 780 },
  { id: 4, name: "Simran Kaur", score: 720 },
];

export default function Leaderboard() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2 text-yellow-600">
        <FaTrophy className="text-yellow-500 text-4xl" /> Leaderboard
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-yellow-100">
              <th className="p-3 text-lg">Rank</th>
              <th className="p-3 text-lg">Name</th>
              <th className="p-3 text-lg">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-yellow-50 border-b last:border-none"
              >
                <td className="p-3 font-semibold flex items-center gap-2">
                  {index === 0 && <FaMedal className="text-yellow-500" />}
                  {index === 1 && <FaMedal className="text-gray-400" />}
                  {index === 2 && <FaMedal className="text-orange-500" />}
                  {index + 1}
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3 font-bold text-yellow-700">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

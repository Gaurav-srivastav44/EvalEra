
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaChartLine, FaClock } from "react-icons/fa";

export default function MockTest() {
  const navigate = useNavigate();

  const mockTests = [
    {
      id: 1,
      title: "GATE CS 2025 - Mock Test 1",
      description: "Full-length mock test covering core CS subjects including DSA, OS, DBMS, CN, and Theory of Computation.",
      duration: "180 mins",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Java Fundamentals Mock Test",
      description: "Test your OOPs, exception handling, and collection framework concepts with this focused Java mock test.",
      duration: "60 mins",
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "React & JavaScript Advanced Mock Test",
      description: "Challenge your frontend skills with React, JS fundamentals, and tricky logical questions.",
      duration: "90 mins",
      difficulty: "Hard",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-900 text-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold mb-4 bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Mock Tests
        </h1>
        <p className="text-gray-300 text-base md:text-lg opacity-90">
          Sharpen your skills with AI-powered mock tests designed for students, professionals, and coaching centers.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="relative bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:border-cyan-400"
          >
            <h2 className="text-xl font-bold mb-3 text-cyan-300">{test.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{test.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-2"><FaClock /> {test.duration}</span>
              <span className="flex items-center gap-2"><FaBrain /> {test.difficulty}</span>
            </div>

            <button
              onClick={() => navigate(`/mock-tests/${test.id}`)}
              className="w-full py-2 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.9)]"
            >
              Start Test
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">
          <FaChartLine className="text-cyan-400" /> Track Your Progress
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Analyze your performance, compare results, and identify areas of improvement through detailed analytics and AI-based feedback.
        </p>
      </div>
    </section>
  );
}

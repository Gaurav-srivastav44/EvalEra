import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain, FaChartLine, FaClock } from "react-icons/fa";

export default function MockTest() {
  const navigate = useNavigate();

  const mockTests = [
    {
      id: 1,
      title: "GATE CS 2025 - Mock Test 1",
      description:
        "Full-length mock test covering core CS subjects including DSA, OS, DBMS, CN, and Theory of Computation.",
      duration: "180 mins",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Java Fundamentals Mock Test",
      description:
        "Test your OOPs, exception handling, and collection framework concepts with this focused Java mock test.",
      duration: "60 mins",
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "React & JavaScript Advanced Mock Test",
      description:
        "Challenge your frontend skills with React, JS fundamentals, and tricky logical questions.",
      duration: "90 mins",
      difficulty: "Hard",
    },
  ];

  const [filter, setFilter] = useState("All");

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredTests =
    filter === "All"
      ? mockTests
      : mockTests.filter((test) => test.difficulty === filter);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-900 text-white py-16 px-6 md:px-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold mb-4 bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Mock Tests
        </h1>
        <p className="text-gray-300 text-base md:text-lg opacity-90">
          Sharpen your skills with AI-powered mock tests designed for students,
          professionals, and coaching centers.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["All", "Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border
              ${
                filter === level
                  ? "bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                  : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Mock Test Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredTests.map((test, idx) => (
          <motion.div
            key={test.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.5)",
            }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-800/40 border border-gray-700 rounded-2xl p-6 
                       shadow-lg backdrop-blur-md cursor-pointer transform-gpu 
                       transition-all duration-300 hover:border-cyan-400"
          >
            <h2 className="text-xl font-bold mb-3 text-cyan-300">
              {test.title}
            </h2>
            <p className="text-gray-300 text-sm mb-4">{test.description}</p>

            <div className="flex items-center justify-between text-sm mb-4">
              <span className="flex items-center gap-2 text-gray-400">
                <FaClock /> {test.duration}
              </span>
              <span
                className={`flex items-center gap-2 ${getDifficultyColor(
                  test.difficulty
                )}`}
              >
                <FaBrain /> {test.difficulty}
              </span>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0,255,255,0.9)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/mock-tests/${test.id}`)}
              className="w-full py-2 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 
                         text-white shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-transform duration-300"
            >
              Start Test
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTests.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No mock tests available for this difficulty.
        </p>
      )}

      {/* Progress Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">
          <FaChartLine className="text-cyan-400" /> Track Your Progress
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Analyze your performance, compare results, and identify areas of
          improvement through detailed analytics and AI-based feedback.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-500 text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} EvalEra |{" "}
        <span className="font-semibold text-cyan-400">
          Empowering AI-Powered Learning
        </span>{" "}
        🚀
      </footer>
    </section>
  );
}

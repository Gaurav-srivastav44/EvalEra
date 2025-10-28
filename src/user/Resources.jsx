import React from "react";
import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

import {
  FaBook,
  FaVideo,
  FaCode,
  FaFileAlt,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";

export default function Resources() {
  const resources = [
    {
      title: "Data Structures & Algorithms",
      desc: "Handpicked notes, visualizations, and practice sheets for mastering DSA.",
      icon: <FaCode className="text-cyan-400 text-4xl" />,
      link: "https://www.geeksforgeeks.org/data-structures/",
      tag: "DSA",
    },
    {
      title: "React Mastery Notes",
      desc: "Understand React concepts with project-based tutorials and cheat sheets.",
      icon: <FaBook className="text-blue-400 text-4xl" />,
      link: "https://react.dev/learn",
      tag: "Frontend",
    },
    {
      title: "Aptitude & Reasoning",
      desc: "Aptitude shortcuts, formulas, and problem sets for placement preparation.",
      icon: <FaFileAlt className="text-yellow-400 text-4xl" />,
      link: "https://www.indiabix.com/aptitude/questions-and-answers/",
      tag: "Aptitude",
    },
    {
      title: "System Design Basics",
      desc: "Learn scalable system architecture with diagrams, patterns, and examples.",
      icon: <FaChalkboardTeacher className="text-teal-400 text-4xl" />,
      link: "https://github.com/donnemartin/system-design-primer",
      tag: "Backend",
    },
    {
      title: "Machine Learning Fundamentals",
      desc: "Start ML from scratch: supervised learning, regression, classification, etc.",
      icon: <FaBrain className="text-pink-400 text-4xl" />,
      link: "https://www.kaggle.com/learn/intro-to-machine-learning",
      tag: "AI/ML",
    },
    {
      title: "YouTube Learning Playlists",
      desc: "Watch curated playlists for coding, projects, and CS fundamentals.",
      icon: <FaVideo className="text-red-400 text-4xl" />,
      link: "https://www.youtube.com/@freecodecamp",
      tag: "Videos",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-12">
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow-lg mb-3">
          📚 Resources Library
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore curated notes, tutorials, and learning materials — everything
          you need to level up your knowledge.
        </p>
      </motion.div>

      {/* Resource Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {resources.map((res, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
            }}
            className="bg-gray-900/80 border border-gray-700/70 rounded-2xl p-7
                       flex flex-col justify-between shadow-xl transition-all duration-300"
          >
            <div>
              <div className="mb-4">{res.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {res.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{res.desc}</p>
              <span className="inline-block bg-cyan-700/40 text-cyan-300 text-xs px-3 py-1 rounded-full font-semibold">
                {res.tag}
              </span>
            </div>

            <motion.a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="mt-6 flex items-center gap-2 text-cyan-400 font-semibold hover:underline"
            >
              Explore <FaArrowRight />
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Section */}
      <div className="text-center mt-16 text-gray-500 text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} EvalEra — Curated by{" "}
        <span className="text-cyan-400 font-semibold">AI Learning Engine</span> 🚀
      </div>
    </div>
  );
}

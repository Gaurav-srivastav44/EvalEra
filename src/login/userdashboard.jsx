import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaBrain,
  FaClipboardList,
  FaTrophy,
  FaBookOpen,
  FaBolt,
  FaChartPie,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { title: "HOME", icon: <FaHome />, link: "/" },
    { title: "Mock Tests", icon: <FaClipboardList />, link: "/mock-tests" },
    { title: "Visualizer", icon: <FaBrain />, link: "/visualizer" },
    { title: "Leaderboard", icon: <FaTrophy />, link: "/leaderboard" },
    { title: "Analytics", icon: <FaChartPie />, link: "/analytics" },
    { title: "Challenges", icon: <FaBolt />, link: "/daily-challenges" },
    { title: "Resources", icon: <FaBookOpen />, link: "/resources" },
  ];

  const features = [
    {
      title: "Mock Tests",
      desc: "Take topic-wise and full-length mock tests to evaluate your performance.",
      icon: <FaClipboardList className="text-white text-4xl drop-shadow-md" />,
      link: "/mock-tests",
    },
    {
      title: "Concept Visualizer",
      desc: "Understand complex concepts visually with AI-powered visual explanations.",
      icon: <FaBrain className="text-white text-4xl drop-shadow-md" />,
      link: "/visualizer",
    },
    {
      title: "Leaderboard",
      desc: "See where you stand among peers with real-time rankings and stats.",
      icon: <FaTrophy className="text-white text-4xl drop-shadow-md" />,
      link: "/leaderboard",
    },
    {
      title: "Performance Analytics",
      desc: "Dive into detailed reports of your strengths and areas for improvement.",
      icon: <FaChartPie className="text-white text-4xl drop-shadow-md" />,
      link: "/analytics",
    },
    {
      title: "Daily Challenges",
      desc: "Boost your skills with daily coding and aptitude challenges.",
      icon: <FaBolt className="text-white text-4xl drop-shadow-md" />,
      link: "/daily-challenges",
    },
    {
      title: "Resources Library",
      desc: "Access curated study material, notes, and videos to enhance learning.",
      icon: <FaBookOpen className="text-white text-4xl drop-shadow-md" />,
      link: "/resources",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
<div
  className={`fixed md:static top-0 left-0 h-screen md:h-auto md:min-h-screen w-64 
    bg-gradient-to-b from-cyan-600 to-blue-800 
    shadow-[0_0_25px_rgba(0,200,255,0.3)] z-50 flex flex-col justify-between 
    transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 transition-transform duration-300`}
>
  {/* Top Section */}
  <div>
    <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-400/30">
      <h1 className="text-2xl font-extrabold tracking-wide text-white">
        Eval<span className="text-cyan-300">Era</span>
      </h1>
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setSidebarOpen(false)}
      >
        <FaTimes />
      </button>
    </div>

    <nav className="flex flex-col gap-2 mt-6 px-4">
      {menuItems.map((item, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
          onClick={() => navigate(item.link)}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white 
                     font-medium hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-xl">{item.icon}</span>
          {item.title}
        </motion.button>
      ))}
    </nav>
  </div>

  {/* Bottom Footer */}
  <div className="px-6 py-4 text-gray-300 text-sm border-t border-cyan-400/30">
    © {new Date().getFullYear()} EvalEra
  </div>
</div>


      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-cyan-400 text-3xl mb-4"
        >
          <FaBars />
        </button>

        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mt-4 md:mt-8"
        >
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl text-cyan-400 drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]" />
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Welcome Back, <span className="text-cyan-300">Gaurav</span> 👋
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-1">
                Track your progress and continue learning smarter.
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold
                     text-lg shadow-xl shadow-cyan-500/30 transition-all duration-300 transform hover:brightness-110"
          >
            View Profile
          </motion.button>
        </motion.header>

        {/* Stats Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {[
            { title: "Tests Attempted", value: 18, color: "text-cyan-400" },
            { title: "Average Score", value: "82%", color: "text-yellow-400" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.15)",
              }}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl transition-all duration-300"
            >
              <h2 className="text-lg font-medium text-gray-300 mb-3 uppercase tracking-wider">
                {stat.title}
              </h2>
              <p className={`text-5xl md:text-6xl font-extrabold ${stat.color} drop-shadow-md`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-cyan-500/50 pb-2 inline-block">
            Key Features
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0, 200, 255, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-6 cursor-pointer
                           shadow-lg hover:shadow-[0_0_45px_rgba(0,200,255,0.9)] transition-all duration-300
                           flex flex-col justify-between h-full transform-gpu"
                onClick={() => navigate(item.link)}
              >
                <div className="flex flex-col gap-3">
                  <div className="mb-2">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20 text-gray-500 text-sm md:text-base border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} EvalEra |{" "}
          <span className="font-semibold text-cyan-400">
            Empowering AI-Powered Learning
          </span>{" "}
          🚀
        </footer>
      </div>
    </div>
  );
}

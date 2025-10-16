import React from "react";
import { FaUsers, FaClipboardList, FaChartPie, FaFileAlt, FaCogs, FaTasks } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const features = [
    {
      title: "Manage Users",
      desc: "View, edit, or delete registered users",
      icon: <FaUsers className="w-10 h-10 text-cyan-400" />,
      link: "/manage-users",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Review Sessions",
      desc: "Evaluate submitted practice sessions",
      icon: <FaClipboardList className="w-10 h-10 text-purple-400" />,
      link: "/review-sessions",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Analytics",
      desc: "View platform metrics and performance stats",
      icon: <FaChartPie className="w-10 h-10 text-green-400" />,
      link: "/analytics",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Manage Tests",
      desc: "Create, update, or delete tests and questions",
      icon: <FaFileAlt className="w-10 h-10 text-yellow-400" />,
      link: "/manage-tests",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Daily Reports",
      desc: "Monitor daily user activity and platform usage",
      icon: <FaTasks className="w-10 h-10 text-pink-400" />,
      link: "/daily-reports",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Settings",
      desc: "Configure platform settings and preferences",
      icon: <FaCogs className="w-10 h-10 text-indigo-400" />,
      link: "/settings",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f33] via-[#003366] to-[#004466] p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 mt-10">Welcome, Admin!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`bg-gradient-to-br ${f.color} p-6 rounded-2xl border border-white/20 shadow-lg cursor-pointer transition-transform duration-300`}
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-100 text-sm mb-4">{f.desc}</p>
            <Link
              to={f.link}
              className="text-white font-semibold hover:underline"
            >
              Go
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

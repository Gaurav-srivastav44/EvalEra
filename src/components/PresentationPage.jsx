import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineHandshake,
  MdOutlineFlashOn,
  MdOutlineWifiTethering,
} from "react-icons/md";
import presentationImage from "../assets/bg3.png";
import bgp from "../assets/bgp.png";

export default function PresentationPage() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 overflow-hidden bg-gradient-to-br from-white via-sky-50 to-cyan-100"
      style={{
        backgroundImage: `url(${bgp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Soft floating glow animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-0 w-72 h-72 bg-cyan-300 rounded-full blur-[100px] opacity-40"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-violet-300 rounded-full blur-[120px] opacity-40"
      ></motion.div>

      {/* LEFT: Image & Title */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center md:items-start flex-1 text-center md:text-left mb-12 md:mb-0 md:mr-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold text-cyan-700 leading-tight drop-shadow-sm"
        >
          The Power of <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">
            Interactive Learning
          </span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full max-w-md md:max-w-lg rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(6,182,212,0.3)] border border-cyan-200"
        >
          <img
            src={presentationImage}
            alt="Interactive learning visual"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.div>

      {/* RIGHT: Content */}
      <motion.div
        variants={containerVariants}
        className="flex flex-col flex-1 w-full max-w-2xl text-gray-700"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6 leading-snug"
        >
          Transform How You{" "}
          <span className="text-cyan-600 font-bold">Learn & Teach</span>
        </motion.h1>

        {/* Icon-based Benefits */}
        <motion.ul variants={containerVariants} className="space-y-5 text-lg">
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <MdOutlineHandshake className="w-7 h-7 text-cyan-500 mt-1" />
            <span>
              <strong>Hands-Free Interaction:</strong> Teach, explain, and
              explore — no devices needed.
            </span>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <MdOutlineFlashOn className="w-7 h-7 text-violet-500 mt-1" />
            <span>
              <strong>Real-Time Feedback:</strong> Every gesture reacts
              instantly for seamless flow.
            </span>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <MdOutlineWifiTethering className="w-7 h-7 text-sky-500 mt-1" />
            <span>
              <strong>Intuitive Experience:</strong> Engage naturally — no setup
              or learning curve.
            </span>
          </motion.li>
        </motion.ul>

        {/* How It Works Box */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 mt-10"
        >
          <h3 className="text-2xl font-semibold text-cyan-700 mb-4">
            How It Works
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Connect:</strong> Works seamlessly with your webcam.
            </li>
            <li>
              <strong>Gesture:</strong> Use your hands to navigate lessons or
              slides.
            </li>
            <li>
              <strong>Control:</strong> Everything responds instantly, keeping
              focus on learning.
            </li>
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-start mt-8"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 25px rgba(6,182,212,0.4), 0 0 40px rgba(139,92,246,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-lg shadow-md transition-all duration-300"
          >
            Try Gesture Learning Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgtest from "../assets/bgtest.png";
import CreateMCQ from "./mcq";
export default function CreateTest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    duration: "",
    difficulty: "",
    questions: "",
    subject: "",
    type: "",
    negativeMarking: "no",
    shuffleQuestions: "yes",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.type === "mcq") navigate("/mcq", { state: form });
    else if (form.type === "descriptive") navigate("/create/descriptive", { state: form });
    else if (form.type === "ai") navigate("/create/ai", { state: form });
  };

  // Form field animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgtest})`,
      }}
    >
      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-800/80 to-purple-900/80 backdrop-blur-[3px]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-xl text-white rounded-3xl shadow-2xl w-full max-w-5xl p-10 border border-white/20"
      >
        {/* Header */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-md"
        >
          Create New Test
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-blue-200 mb-10"
        >
          Fill in the details below to set up your test configuration.
        </motion.p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            { label: "Test Name", name: "name", type: "text", placeholder: "e.g. Java Basics Test" },
            { label: "Duration (in minutes)", name: "duration", type: "number", placeholder: "e.g. 60" },
            { label: "Difficulty Level", name: "difficulty", type: "select", options: ["Easy", "Medium", "Hard"] },
            { label: "Number of Questions", name: "questions", type: "number", placeholder: "e.g. 10" },
            { label: "Subject / Topic", name: "subject", type: "text", placeholder: "e.g. Data Structures" },
            { label: "Test Type", name: "type", type: "select", options: ["MCQ", "Descriptive", "AI-Based"] },
            { label: "Enable Negative Marking", name: "negativeMarking", type: "select", options: ["No", "Yes"] },
            { label: "Shuffle Questions", name: "shuffleQuestions", type: "select", options: ["Yes", "No"] },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label className="block mb-2 font-semibold text-blue-100">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-gray-300/20 border border-gray/30 font-bold text-gray-600 focus:ring-2 focus:ring-cyan-400 outline-1"
                >
                  <option value="">-- Select --</option>
                  {field.options.map((opt) => (
                    <option key={opt.toLowerCase()} value={opt.toLowerCase()}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-xl bg-white/20 border border-gray/30 placeholder-blue-200 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                />
              )}
            </motion.div>
          ))}

          {/* Description (Full width) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <label className="block mb-2 font-semibold text-blue-100">
              Description / Instructions
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. This test covers core Java concepts and OOP fundamentals."
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-blue-200 text-white focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
            />
          </motion.div>

          {/* Button */}
          <motion.div
            className="md:col-span-2 mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ffff" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all"
            >
              Continue →
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

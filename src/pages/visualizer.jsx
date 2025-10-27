import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Visualizer() {
  const [topic, setTopic] = useState("sorting");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [array, setArray] = useState([5, 3, 8, 1, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanations, setExplanations] = useState([]);

  // --- Sorting algorithms with explanations ---
  const sortingAlgorithms = {
    bubble: (arr) => {
      let a = [...arr];
      let s = [];
      let e = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            e.push(`Swapped ${a[j]} and ${a[j + 1]}`);
          } else {
            e.push(`Compared ${a[j]} and ${a[j + 1]} — no swap`);
          }
          s.push([...a]);
        }
      }
      return { s, e };
    },

    selection: (arr) => {
      let a = [...arr];
      let s = [];
      let e = [];
      for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          if (a[j] < a[minIdx]) minIdx = j;
        }
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        e.push(`Placed ${a[i]} at correct position`);
        s.push([...a]);
      }
      return { s, e };
    },
  };

  // --- Handle visualization ---
  const handleVisualize = () => {
    if (topic === "sorting") {
      const { s, e } = sortingAlgorithms[algorithm](array);
      setSteps(s);
      setExplanations(e);
      setCurrentStep(0);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // --- Framer Motion Variants ---
  const barVariants = {
    initial: { y: 30, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1 },
    move: { scale: [1, 1.15, 1], transition: { duration: 0.5 } },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-cyan-100 to-blue-200 text-gray-900 p-8 md:p-20 flex flex-col items-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent"
      >
        DSA Visualizer Hub 🚀
      </motion.h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none"
        >
          <option value="sorting">Sorting</option>
        </select>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
        </select>

        <input
          type="text"
          value={array.join(",")}
          onChange={(e) => setArray(e.target.value.split(",").map(Number))}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-cyan-500 focus:outline-none w-64"
          placeholder="Enter array, e.g., 5,3,8,1,2"
        />

        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.9 }}
          onClick={handleVisualize}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md"
        >
          Visualize
        </motion.button>
      </div>

      {/* Visualization Grid */}
      {steps.length > 0 && (
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Animated Bars Section */}
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            className="flex items-end gap-3 bg-white/50 p-6 rounded-xl shadow-lg"
          >
            <AnimatePresence>
              {steps[currentStep].map((num, idx) => (
                <motion.div
                  key={idx}
                  layout
                  variants={barVariants}
                  animate="move"
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{
                    height: `${num * 25}px`,
                    backgroundColor: `hsl(${(num / Math.max(...array)) * 200}, 80%, 55%)`,
                  }}
                  className="w-10 rounded-md flex items-end justify-center text-white font-bold shadow-md"
                >
                  {num}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Step Explanation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 p-6 rounded-xl shadow-lg w-full md:w-80 text-left"
          >
            <h2 className="text-2xl font-semibold text-cyan-700 mb-4">Step Explanation 💬</h2>
            <p className="text-gray-800 min-h-[80px]">
              {explanations[currentStep]}
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </motion.div>
        </div>
      )}

      {/* Navigation buttons */}
      {steps.length > 0 && (
        <div className="flex gap-4 mt-8">
          <motion.button
            whileHover={buttonHover}
            whileTap={{ scale: 0.9 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-full disabled:opacity-50"
          >
            Previous
          </motion.button>

          <motion.button
            whileHover={buttonHover}
            whileTap={{ scale: 0.9 }}
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-full disabled:opacity-50"
          >
            Next
          </motion.button>
        </div>
      )}
    </div>
  );
}

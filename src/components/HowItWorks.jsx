import React, { useEffect, useState } from "react";
import { Cpu, BarChart3, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MdSchool } from "react-icons/md";

export default function HowItWorks() {
  const steps = [
    {
      title: "Enhance Learning",
      desc: "Practice, visualize, and improve your algorithms with AI-powered insights.",
      icon: <MdSchool className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "AI Evaluation",
      desc: "EvalEra’s AI model analyzes logic, accuracy, and learning pace.",
      icon: <Cpu className="w-10 h-10 text-teal-500" />,
    },
    {
      title: "Insight Generation",
      desc: "Receive personalized reports and AI-driven learning suggestions.",
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Fair & Transparent Scoring",
      desc: "No bias — only data-driven, consistent performance analysis.",
      icon: <Medal className="w-10 h-10 text-teal-600" />,
    },
  ];

  const flowSteps = [
    "AI Detection & Tracking",
    "Data Analysis",
    "Insight Dashboard",
    "EvalEra Final Evaluation",
  ];

  const [visibleSteps, setVisibleSteps] = useState([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers = [];

    flowSteps.forEach((step, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, step]);
        }, index * 1000)
      );
    });

    timers.push(
      setTimeout(() => {
        setVisibleSteps([]);
        setCycle((c) => c + 1);
      }, flowSteps.length * 1000 + 1500)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [cycle]);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-teal-50 text-gray-800 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.08),transparent_70%)]"></div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent relative z-10">
        How EvalEra Works
      </h2>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 relative z-10 items-start">
        
        {/* Left Column: Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group p-6 rounded-2xl bg-white backdrop-blur-xl border border-teal-100 
                         hover:border-teal-300 hover:shadow-lg hover:shadow-blue-200/50 
                         transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Animated Flow */}
        <div className="flex flex-col lg:ml-16 items-center lg:items-start">
          <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
            Process Flow
          </h3>

          <div className="relative w-full max-w-md flex flex-col space-y-6">
            <AnimatePresence>
              {visibleSteps.map((step, index) => (
                <motion.div
                  key={`${step}-${index}-${cycle}`}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-4 w-full text-center rounded-xl border border-blue-200 bg-white/70 backdrop-blur-lg shadow-md shadow-blue-100"
                >
                  <span className="text-blue-600 font-semibold">{step}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

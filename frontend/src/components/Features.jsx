import React, { useEffect, useState } from "react";
import { BrainCircuit, ShieldCheck, Activity, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesRow() {
  const features = [
    {
      title: "AI-Powered Talent Analysis",
      desc: "AI detects accuracy, technique, and performance with real-time precision.",
      icon: <BrainCircuit className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Cheat & Fraud Detection",
      desc: "Ensures fair evaluation using anomaly detection & motion tracking.",
      icon: <ShieldCheck className="w-10 h-10 text-teal-500" />,
    },
    {
      title: "Holistic Skill Scoring",
      desc: "Evaluates logical reasoning, speed, and efficiency for accurate assessment.",
      icon: <Activity className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Student & Mentor Dashboard",
      desc: "Centralized platform for learners and mentors to track progress & insights.",
      icon: <Users className="w-10 h-10 text-teal-600" />,
    },
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  // Trigger animation every 10s
  const [key, setKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setKey((prev) => prev + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-teal-50 text-gray-800 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.08),transparent_70%)]"></div>

      <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent relative z-10">
        Key Features
      </h2>

      <motion.div
        key={key}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-stretch gap-8 px-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              y: -8,
              scale: 1.05,
              backgroundColor: "rgba(230, 245, 255, 1)", // Slightly darker on hover
            }}
            transition={{ type: "spring", stiffness: 150 }}
            className="flex-1 p-6 rounded-2xl bg-white border border-blue-100 
                       hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60 
                       transition-all text-center"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

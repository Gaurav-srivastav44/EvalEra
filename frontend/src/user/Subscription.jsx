import React from "react";
import { motion } from "framer-motion";
import { FaCrown, FaRocket, FaUserShield, FaQrcode } from "react-icons/fa";
import QR from "../assets/QR.jpg"; // ✅ Make sure QR.jpg exists in src/assets/

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    icon: <FaRocket className="text-blue-500 text-4xl mb-3" />,
    price: 199,
    features: ["Access to Resources", "Mock Tests", "Limited Analytics"],
  },
  {
    id: "pro",
    name: "Pro Plan",
    icon: <FaCrown className="text-yellow-500 text-4xl mb-3" />,
    price: 499,
    features: ["All Basic Features", "Full Analytics", "Leaderboard Access"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    icon: <FaUserShield className="text-purple-600 text-4xl mb-3" />,
    price: 999,
    features: [
      "All Pro Features",
      "Unlimited Mock Tests",
      "AI-Driven Insights",
      "Priority Support",
    ],
  },
];

export default function Subscription() {
  const handleShowPayment = (plan) => {
    alert(
      `📢 To subscribe to the ${plan.name}, please scan the QR code below or pay via UPI ID: diagonpower44-1@okicici`
    );
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-gray-800"
      >
        Choose Your Subscription Plan
      </motion.h1>

      <p className="text-gray-600 mb-10">
        💡 Demo Mode Active — Pay manually using UPI or scan the QR code below.
      </p>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl p-8"
          >
            {plan.icon}
            <h2 className="text-2xl font-bold mb-3">{plan.name}</h2>
            <p className="text-3xl font-semibold mb-6">₹{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button
              onClick={() => handleShowPayment(plan)}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </motion.div>
        ))}
      </div>

      {/* Manual Payment Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-md rounded-2xl p-8 max-w-md mx-auto"
      >
        <FaQrcode className="text-indigo-600 text-5xl mb-4 mx-auto" />
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Pay via UPI or QR
        </h3>
        <p className="text-gray-600 mb-3">Scan this QR or pay directly to:</p>
        <p className="font-semibold text-lg text-indigo-700 mb-6">
          diagonpower44-1@okicici
        </p>
        <img
          src={QR} // ✅ Fixed reference here
          alt="QR Code"
          className="mx-auto w-48 h-48 rounded-lg shadow-md border"
        />
        <p className="text-gray-500 mt-4 text-sm">
          After payment, please share the screenshot with support for
          verification.
        </p>
      </motion.div>
    </div>
  );
}

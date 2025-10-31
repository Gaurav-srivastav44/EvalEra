import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaChartLine } from "react-icons/fa";

const progressData = [
  { week: "Week 1", score: 60 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 80 },
  { week: "Week 4", score: 90 },
];

const accuracyData = [
  { name: "Correct", value: 75 },
  { name: "Incorrect", value: 25 },
];

const COLORS = ["#4ade80", "#f87171"];

export default function Analytics() {
  return (
    <div className="p-6 bg-gray-50 mt-12 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8 flex justify-center items-center gap-2">
        <FaChartLine /> Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Answer Accuracy</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={accuracyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {accuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

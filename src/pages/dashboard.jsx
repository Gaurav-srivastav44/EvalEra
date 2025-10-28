import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // get role

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {role === "admin" ? "Admin" : "User"}!
      </h1>

      {role === "admin" ? (
        <div className="space-y-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate("/create-test")}
          >
            Create Test
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => navigate("/mock-tests")}
          >
            View All Tests
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem("role");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            className="px-6 py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            onClick={() => navigate("/mock-tests")}
          >
            Take Mock Test
          </button>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => navigate("/visualizer")}
          >
            DSA Visualizer
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem("role");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

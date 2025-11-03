import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [user, setUser] = useState({ username: "", role: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    setUser({ username, role });
    // Listen for storage change on other tabs
    window.addEventListener("storage", () => {
      setUser({ username: localStorage.getItem("username"), role: localStorage.getItem("role") });
    });
  }, []);
  const isLoggedIn = Boolean(user?.username);
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-1 px-10 z-30 backdrop-blur-md bg-gray-800 border-b border-cyan-500/20">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 h-12">
        <img src={Logo} alt="EvalEra Logo" className="h-16 w-auto md:h-16 drop-shadow-[0_0_16px_rgba(0,255,255,0.4)] hover:scale-105 transition-all duration-300" />
      </Link>
      {/* Menu */}
      <ul className="hidden md:flex gap-8 items-center text-base font-medium text-white">
        <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
        <li><Link to="/mock-tests" className="hover:text-cyan-400 transition">Mock Tests</Link></li>
        <li><Link to="/visualizer" className="hover:text-cyan-400 transition">DSA Visualizer</Link></li>
        <li><Link to="/userdashboard" className="hover:text-cyan-400 transition">Dashboard</Link></li>
        <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
      </ul>
      {/* User block */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-cyan-300 font-bold text-lg mr-2">{user.username} {user.role && <span className="text-gray-400 text-base">({user.role})</span>}</span>
            <button
              onClick={() => { localStorage.clear(); navigate('/login'); }}
              className="relative px-6 py-2 text-lg font-semibold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_0_10px_rgba(240,0,0,0.5)] transition-all duration-300 hover:scale-105"
            >Logout</button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="relative px-6 py-2 text-lg font-semibold rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.9)]"
          >Login</Link>
        )}
      </div>
    </nav>
  );
}

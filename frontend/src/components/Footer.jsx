import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-6 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand and Description */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-cyan-400">EvalEra</h3>
          <p className="text-sm">
            AI-powered learning platform with DSA visualization, mock tests, and personalized insights.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
          <Link to="/" className="hover:text-cyan-400 transition-colors duration-200">Home</Link>
          <Link to="/how-it-works" className="hover:text-cyan-400 transition-colors duration-200">How It Works</Link>
          <Link to="/mock-tests" className="hover:text-cyan-400 transition-colors duration-200">Mock Tests</Link>
          <Link to="/visualizer" className="hover:text-cyan-400 transition-colors duration-200">Visualizer</Link>
          <Link to="/login" className="hover:text-cyan-400 transition-colors duration-200">Login</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-gray-200">Connect with Us</h4>
          <div className="flex gap-3 text-2xl">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-cyan-400 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors duration-200">
              <FaLinkedin />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:text-cyan-400 transition-colors duration-200">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-gray-800 mt-4 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} EvalEra. All rights reserved.</p>
        <p className="mt-1">Made by Gaurav Srivastav</p>
      </div>
    </footer>
  );
}

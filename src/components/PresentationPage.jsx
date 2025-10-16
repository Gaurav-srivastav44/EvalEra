import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { MdOutlineHandshake, MdOutlineFlashOn, MdOutlineWifiTethering } from "react-icons/md";
import presentationImage from "../assets/bg3.png";

export default function PresentationPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900 p-8 md:p-16 items-center">
      
      {/* Left side: Image and Headline */}
      <div className="flex flex-col justify-center items-center md:items-start flex-1 mb-10 md:mb-0 md:mr-16">
        <h2 
          className="text-4xl md:text-6xl font-extrabold text-cyan-700 mb-6 text-center md:text-left leading-tight
                     transition-all duration-300
                     hover:text-cyan-500 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        >
          The Power of <br className="hidden md:inline" /> Interactive Learning
        </h2>
        <div 
          className="w-full max-w-md md:max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-800
                     transition-all duration-300 ease-in-out
                     hover:shadow-[0_0_30px_rgba(6,182,212,0.7),_0_0_20px_rgba(6,182,212,0.5)] hover:border-cyan-500"
        >
          <img
            src={presentationImage}
            alt="Illustration of interactive learning using gestures"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right side: Content */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-2xl">
        <h1 
          className="text-3xl md:text-5xl font-bold text-gray-700 mb-6 text-center md:text-left
                     transition-all duration-300
                     hover:text-cyan-600 hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]"
        >
          Transform How You Learn & Teach
        </h1>
        
        

        {/* Icon-driven benefits */}
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-md">
            <MdOutlineHandshake className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
            <span className="text-gray-600">
              <strong>Hands-Free Interaction:</strong> Say goodbye to clickers and cables. Move freely while teaching or learning.
            </span>
          </li>
          <li className="flex items-start gap-3 text-md">
            <MdOutlineFlashOn className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
            <span className="text-gray-600">
              <strong>Real-Time Feedback:</strong> The system reacts instantly to gestures, providing smooth, confident control.
            </span>
          </li>
          <li className="flex items-start gap-3 text-md">
            <MdOutlineWifiTethering className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
            <span className="text-gray-600">
              <strong>Intuitive Learning:</strong> No complicated setup or training needed. Everyone can engage naturally.
            </span>
          </li>
        </ul>

        {/* How It Works Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl mt-8 mb-8">
          <h3 
            className="text-2xl font-semibold mb-4 text-cyan-700 flex items-center gap-2
                       transition-all duration-300
                       hover:text-cyan-500 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
          >
           How It Works
          </h3>
          <ul className="space-y-4 text-md text-gray-800">
            <li>
              <strong>Connect:</strong> Integrates seamlessly with your webcam or device camera.
            </li>
            <li>
              <strong>Gesture:</strong> Perform intuitive hand movements to interact with lessons, presentations, or tests.
            </li>
            <li>
              <strong>Control:</strong> Slides, questions, or educational tools respond instantly, letting you focus on teaching or learning.
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center md:justify-start">
          <button 
            onClick={() => console.log("Navigate to gesture control page")} 
            className="px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-md transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Try Gesture Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}

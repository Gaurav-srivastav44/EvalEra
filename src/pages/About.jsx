import React from "react";

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-cyan-900 via-teal-800 to-teal-700 text-white pt-24 px-8 flex flex-col items-center justify-center">
      
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">
         About Gaurav Srivastav
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-4xl text-center mb-10">
        Hi, I'm Gaurav Srivastav, a passionate developer focused on creating innovative web solutions. My latest project, 
        <strong> Gesture Slides</strong>, is a web platform that allows users to control slide presentations using intuitive hand gestures. 
        It leverages computer vision and AI to make presentations more interactive and hands-free.
      </p>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-2">🌟 My Mission</h2>
          <p className="text-gray-200">
            To develop user-friendly and cutting-edge web applications that simplify tasks and enhance productivity, bridging technology and human interaction.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-2">🚀 Project Vision</h2>
          <p className="text-gray-200">
            To make presentations and digital interactions seamless by integrating AI-powered gesture controls, enabling a more natural and engaging experience.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-300">
        Explore Gesture Slides
      </button>

      {/* Decorative Visuals */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-72 h-72 bg-white/5 rounded-full -top-32 -left-32 animate-ping"></div>
        <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-40 -right-40 animate-pulse"></div>
      </div>
    </div>
  );
}

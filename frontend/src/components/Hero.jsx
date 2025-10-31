import { useNavigate } from "react-router-dom";
// Ensure this path is correct for the image you want to use
import bg from "../assets/bg.png"; 

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div
      // 1. Removed the old background gradient (from-gray-600...)
      // 2. Added bg-[url] to use the imported image
      // 3. Added bg-cover, bg-center to ensure it looks good on all screen sizes
      className="relative bg-black text-white overflow-hidden" 
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay for dark effect & blur: 
        This is crucial to darken the image and make the white text readable.
      */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-none"></div> 
      {/* NOTE: Increased opacity to bg-black/80 for better text readability */}

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-[100px] py-20">
        
        {/* Title */}
        <h1 className="text-[60px] md:text-[90px] font-extrabold mb-4 
                       bg-gradient-to-br from-cyan-300 to-blue-500 bg-clip-text text-transparent 
                       drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
          <span className="block leading-[1.1]">EvalEra</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          AI-Powered Learning for Schools, Coaching & Personal Growth
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-300 opacity-90 mb-10 max-w-2xl">
          Create and take mock tests, visualize concepts, track progress, and get AI-driven insights. 
          EvalEra is perfect for students, coaching centers, and schools looking to personalize learning and improve results.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Start Mock Test → User Login */}
          <button
            onClick={() => navigate("/login")}
            className="relative px-8 py-3 text-lg font-semibold rounded-full overflow-hidden 
                           bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                           shadow-[0_0_15px_rgba(0,255,255,0.7)]
                           transition-all duration-300
                           hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.9)]"
          >
            <span className="relative z-10">Start Mock Test</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-xl"></span>
          </button>

          {/* Visualize Concepts → stays same */}
          <button
            onClick={() => navigate("/visualizer")}
            className="relative px-8 py-3 text-lg font-semibold rounded-full overflow-hidden 
                           bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                           shadow-[0_0_15px_rgba(128,90,213,0.7)]
                           transition-all duration-300
                           hover:scale-105 hover:shadow-[0_0_25px_rgba(128,90,213,0.9)]"
          >
            <span className="relative z-10">Visualize Concepts</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-30 blur-xl"></span>
          </button>

          
      
        </div>
      </div>
    </div>
  );
}
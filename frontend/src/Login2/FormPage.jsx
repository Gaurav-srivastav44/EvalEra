import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SlidePage from "./SlidePage";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname.endsWith("/login");

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== Mobile Layout =====
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-md"
        >
          <FaHome size={20} />
        </button>

        <div className="w-full max-w-md bg-black rounded-lg shadow-[0_0_25px_3px_rgba(0,255,255,0.5)] overflow-hidden relative">
          {/* Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-t-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 space-y-6">
            {/* Header */}
            <div>
              <h2 className="font-extrabold text-3xl sm:text-4xl">
                {isLogin ? "WELCOME BACK!" : "JOIN US!"}
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-2 max-w-[280px]">
                {isLogin
                  ? "Log in to access your account and enjoy our services."
                  : "Create your account and start exploring endless possibilities."}
              </p>
            </div>

            {/* Forms */}
            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route index element={<Navigate to="login" />} />
                  <Route path="login" element={<SlidePage><Login /></SlidePage>} />
                  <Route path="register" element={<SlidePage><Register /></SlidePage>} />
                </Routes>
              </AnimatePresence>
            </div>

            {/* Switch Links */}
            <p className="text-white/70 text-sm mt-2">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <NavigateLink isLogin={isLogin} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== Desktop Layout =====
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg"
      >
        <FaHome size={24} />
      </button>

      <div className="relative w-[1000px] h-[580px] rounded-lg border border-cyan-500 shadow-[0_0_25px_3px_rgba(0,255,255,0.5)] overflow-hidden flex">
        {isLogin ? (
          <>
            <div className="w-[50%] h-full relative flex flex-col justify-center items-start text-white px-12 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-700"
                animate={{ x: 0, clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.div className="relative z-10">
                <h2 className="font-extrabold text-5xl leading-tight mb-4">
                  WELCOME<br />BACK!
                </h2>
                <p className="text-white/80 text-base max-w-[280px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?
                </p>
              </motion.div>
            </div>

            <div className="relative w-[50%] h-full bg-black flex items-center px-10 z-10 justify-center">
              <div className="w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <Routes location={location} key={location.pathname}>
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<SlidePage><Login /></SlidePage>} />
                    <Route path="register" element={<SlidePage><Register /></SlidePage>} />
                  </Routes>
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative w-[50%] h-full bg-black flex items-center px-10 z-10 justify-center">
              <div className="w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <Routes location={location} key={location.pathname}>
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<SlidePage><Login /></SlidePage>} />
                    <Route path="register" element={<SlidePage><Register /></SlidePage>} />
                  </Routes>
                </AnimatePresence>
              </div>
            </div>

            <div className="w-[50%] h-full relative flex flex-col justify-center items-end text-white px-12 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-700"
                animate={{ x: 0, clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.div className="relative z-10 text-right">
                <h2 className="font-extrabold text-5xl leading-tight mb-4">
                  JOIN<br />US!
                </h2>
                <p className="text-white/80 text-base max-w-[280px]">
                  Create your account and start exploring endless possibilities.
                </p>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Switch link component for mobile
function NavigateLink({ isLogin }) {
  return (
    <a
      href={isLogin ? "/auth/register" : "/auth/login"}
      className="text-cyan-400 font-bold hover:underline"
    >
      {isLogin ? "Register" : "Sign In"}
    </a>
  );
}

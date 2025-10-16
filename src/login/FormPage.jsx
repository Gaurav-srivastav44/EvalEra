import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SlidePage from "./SlidePage";
import Login from "./Login";
import Register from "./Register";

export default function FormPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative w-[1000px] h-[580px] rounded-lg border border-pink-600 shadow-[0_0_25px_3px_rgba(255,0,120,0.5)] overflow-hidden flex">
        {isLogin ? (
          <>
            <div className="w-[50%] h-full relative flex flex-col justify-center items-start text-white px-12 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-800"
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
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<SlidePage><Login /></SlidePage>} />
                    <Route path="/register" element={<SlidePage><Register /></SlidePage>} />
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
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<SlidePage><Login /></SlidePage>} />
                    <Route path="/register" element={<SlidePage><Register /></SlidePage>} />
                  </Routes>
                </AnimatePresence>
              </div>
            </div>

            <div className="w-[50%] h-full relative flex flex-col justify-center items-end text-white px-12 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-800"
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

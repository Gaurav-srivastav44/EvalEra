import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const formVariants = {
  initial: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.55, ease: "easeInOut" },
  }),
};

export default function SlidePage({ children }) {
  const location = useLocation();
  const direction = location.pathname === "/register" ? 1 : -1;

  return (
    <motion.div
      key={location.pathname}
      variants={formVariants}
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col justify-center"
    >
      {children}
    </motion.div>
  );
}

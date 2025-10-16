import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaLock, FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Alert from "../components/alert";

import { auth, provider } from "../firebase"; // your firebase.js
import { signInWithPopup } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["admin", "user"]).required("Role is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", role: "user" },
    validationSchema: schema,
    onSubmit: (values) => {
      const { email, password, role } = values;

      const isValid =
        (role === "admin" && email === "admin@example.com" && password === "admin123") ||
        (role === "user" && email === "user@example.com" && password === "user123");

      if (isValid) {
        localStorage.setItem("role", role);
        role === "admin" ? navigate("/admindashboard") : navigate("/userdashboard");
      } else {
        setAlert({ type: "error", message: "Invalid credentials!" });
        setTimeout(() => setAlert(null), 5000);
      }
    },
  });

  // 🔹 Google Login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/userdashboard"); // redirect after Google login
      })
      .catch((error) => {
        console.error(error);
        setAlert({ type: "error", message: "Google login failed!" });
        setTimeout(() => setAlert(null), 5000);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden mt-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002b36] via-[#004466] to-[#001f33]" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full max-w-sm text-center bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-lg"
      >
        {/* Alert */}
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <FaUserCircle className="text-white text-7xl" />
        </div>

        {/* Role Selector */}
        <div className="mb-6 flex justify-center gap-0 relative bg-white/10 rounded-full p-1">
          <AnimatePresence mode="wait">
            {["user", "admin"].map((r) => (
              <motion.label
                key={r}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="flex-1 text-center py-2 cursor-pointer select-none z-10 text-white font-medium"
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={formik.values.role === r}
                  onChange={formik.handleChange}
                  className="hidden"
                />
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </motion.label>
            ))}
          </AnimatePresence>

          {/* Highlight background */}
          <motion.div
            layout
            className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
            style={{ width: "50%", left: formik.values.role === "user" ? "0%" : "50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaUserCircle className="absolute left-3 top-3 text-white" />
          <input
            type="text"
            name="email"
            placeholder="USERNAME"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border w-full pl-10 pr-3 py-2 rounded-md border-white bg-transparent text-white placeholder:text-white focus:outline-none"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-400 text-sm mb-2">{formik.errors.email}</div>
        )}

        {/* Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-white" />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border w-full pl-10 pr-3 py-2 rounded-md border-white bg-transparent text-white placeholder:text-white focus:outline-none"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-400 text-sm mb-2">{formik.errors.password}</div>
        )}

        {/* Login Button */}
        <motion.button
          type="submit"
          className="bg-white text-blue-700 font-bold py-2 px-4 w-full rounded-md mb-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LOGIN
        </motion.button>

       

        {/* Extra Links */}
        <p className="mt-3 text-sm text-white">
          <Link to="/forgot" className="cursor-pointer hover:underline">
            Forgot password?
          </Link>
        </p>
        <p className="mt-3 text-sm text-white">
          Don’t have an account?{" "}
          <Link to="/signUp" className="cursor-pointer hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaLock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Alert from "../components/alert"; // Assuming you have this component

function Signup() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  // --- 1. Validation Schema ---
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match") // New validation
      .required("Confirm Password is required"),
  });

  // --- 2. Formik Setup ---
  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      // --- 3. Mock Sign Up Logic ---
      console.log("Sign Up Data:", values);
      
      // In a real application, you would make an API call here.
      // For this example, we'll simulate a successful sign-up and redirect.
      
      setAlert({ 
        type: "success", 
        message: "Sign Up Successful! Redirecting to Login...",
      });
      
      // Navigate to the login page after a short delay
      setTimeout(() => {
        setAlert(null);
        navigate("/login"); 
      }, 2000);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
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

        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-white" />
          <input
            type="text"
            name="email"
            placeholder="EMAIL ADDRESS"
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
        <div className="relative mb-4">
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
        
        {/* Confirm Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-white" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border w-full pl-10 pr-3 py-2 rounded-md border-white bg-transparent text-white placeholder:text-white focus:outline-none"
          />
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-400 text-sm mb-2">{formik.errors.confirmPassword}</div>
        )}

        {/* Sign Up Button */}
        <motion.button
          type="submit"
          className="bg-white text-blue-700 font-bold py-2 px-4 w-full rounded-md mt-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SIGN UP
        </motion.button>

        {/* Extra Links */}
        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
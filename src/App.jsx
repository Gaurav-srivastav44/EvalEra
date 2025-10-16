import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// 🔹 Main Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import PresentationPage from "./components/PresentationPage";

// 🔹 Dashboards
import UserDashboard from "./login/userdashboard";
import AdminDashboard from "./login/admindashboard";

// 🔹 Pages
import MockTest from "./pages/mock-tests";
import CreateTest from "./pages/create-test";
import Visualizer from "./pages/visualizer";

// 🔹 New Animated Login System
import FormPage from "./Login2/FormPage";

// 🔒 Private Route
const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/login" />;
};

function AppWrapper() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = [
    "/mock-tests",
    "/create-test",
    "/visualizer",
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    "/userdashboard",
    "/admindashboard",
  ];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <PresentationPage />
              <HowItWorks />
              <Features />
              <Footer />
            </main>
          }
        />

        {/* 🔹 Auth Routes */}
        <Route path="/auth/*" element={<FormPage />} />

        {/* Shortcuts for direct access */}
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth/register" replace />} />

        {/* 📘 Test Pages */}
        <Route path="/mock-tests" element={<MockTest />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/visualizer" element={<Visualizer />} />

        {/* 🧑‍💻 User Dashboard */}
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* 👨‍💼 Admin Dashboard */}
        <Route
          path="/admindashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ⚠️ 404 Fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl text-red-500">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

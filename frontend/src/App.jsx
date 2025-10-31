import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";



// 🔹 Pages & Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import PresentationPage from "./components/PresentationPage";
import Subscription from "./user/Subscription";

// Dashboards
import UserDashboard from "./user/userdashboard";
import AdminDashboard from "./admin/admindashboard";
import Assignments from "./admin/assignments";
import CreateAssignment from "./admin/createAssignment";
import JoinTest from "./user/jointest";
import Resources from "./user/Resources";
import Analytics from "./user/Analytics";
import Leaderboard from "./user/Leaderboard";
import ReviewSubmissions from "./admin/ReviewSubmissions";


// Other Pages
import MockTest from "./pages/mock-tests";
import CreateTest from "./create/create-test";
import Visualizer from "./pages/visualizer";
import CreateMCQ from "./create/mcq";
import AITest from "./create/ai";

// Auth
import FormPage from "./Login2/FormPage";

// 🔒 Private Route
const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/login" />;
};

function AppWrapper() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/mock-tests",
    "/create-test",
    "/create/mcq",
    "/create/descriptive",
    "/create/ai",
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
        {/* Home */}
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

        {/* Auth */}
        <Route path="/auth/*" element={<FormPage />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth/register" replace />} />

        {/* Test Pages */}
        <Route path="/mock-tests" element={<MockTest />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/jointest" element={<JoinTest />} /> 
        <Route path="/resources" element={<Resources />} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="/review-submissions" element={<PrivateRoute><ReviewSubmissions /></PrivateRoute>} />

        {/* MCQ / AI */}
        <Route path="/mcq" element={<CreateMCQ />} />
        <Route path="/ai" element={<AITest />} />

        {/* Dashboards */}
        <Route path="/userdashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/subscription" element={<Subscription />} />

        {/* Assignments */}
        <Route path="/assignments" element={<PrivateRoute><Assignments /></PrivateRoute>} />
        <Route path="/create-assignment" element={<PrivateRoute><CreateAssignment /></PrivateRoute>} />

        {/* 404 */}
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

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

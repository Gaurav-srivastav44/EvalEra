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
import AdminTests from "./admin/tests";
import JoinTest from "./user/jointest";
import Resources from "./user/Resources";
import Analytics from "./user/Analytics";
import Leaderboard from "./user/Leaderboard";
import ReviewSubmissions from "./admin/ReviewSubmissions";
import UserAssignments from "./user/assignments";


// Other Pages
import MockTest from "./pages/mock-tests";
import CreateTest from "./create/create-test";
import Visualizer from "./pages/visualizer";
import DailyChallenges from "./pages/daily-challenges";
import Problems from "./pages/problems";
import SolveProblem from "./pages/solve-problem";
import CreateMCQ from "./create/mcq";
import AITest from "./create/ai";
import TakeTest from "./user/take-test";

// Auth
import FormPage from "./Login2/FormPage";
import Profile from "./pages/Profile";

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
        <Route path="/problems" element={<PrivateRoute><Problems /></PrivateRoute>} />
        <Route path="/problems/:id" element={<PrivateRoute><SolveProblem /></PrivateRoute>} />
        <Route path="/jointest" element={<JoinTest />} /> 
        <Route path="/take-test/:id" element={<PrivateRoute><TakeTest /></PrivateRoute>} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/daily-challenges" element={<PrivateRoute><DailyChallenges /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="/my-assignments" element={<PrivateRoute><UserAssignments /></PrivateRoute>} />
        <Route path="/review-submissions" element={<PrivateRoute><ReviewSubmissions /></PrivateRoute>} />

        {/* MCQ / AI */}
        <Route path="/mcq" element={<CreateMCQ />} />
        <Route path="/ai" element={<AITest />} />

        {/* Dashboards */}
        <Route path="/userdashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/tests" element={<PrivateRoute><AdminTests /></PrivateRoute>} />
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

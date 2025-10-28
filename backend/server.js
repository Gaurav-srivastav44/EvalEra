import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Routes
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import dashboardRoutes from "./routes/dashboard.js";
import assignmentRoutes from "./routes/assignments.js"; // ← new

// DB Connection
import connectDB from "./config/connectDB.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assignments", assignmentRoutes); // ← new route

// Default route
app.get("/", (req, res) => {
  res.send(
    "Backend is running. Use /api/auth for login/signup, /api/assignments for assignments, /api/generate-questions for AI test."
  );
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

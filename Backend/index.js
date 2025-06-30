// Importing modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importing routes
import User from "./routes/users/user.js";
import userRoutes from "./routes/users/userRoutes.js";
import Upload from "./routes/uploads/uploads.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { authorizeRole } from "./middleware/roleMiddleware.js";

// dotenv config initialization
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// App creation
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/users", User);
app.use("/api/files", Upload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get(
  "/admin/dashboard",
  authenticateToken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: `Welcome admin ${req.user.name}` });
  }
);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

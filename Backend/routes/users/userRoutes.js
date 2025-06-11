import express from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome to the dashboard, ${req.user.name}!`,
  });
});

export default router;

// importing packages
import express from "express";
import {
  signUpUser,
  loginUser,
  deleteUser,
} from "../../Controllers/userController.js";

// Creating router instance
const router = express.Router();

// Defining routes
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

export default router;

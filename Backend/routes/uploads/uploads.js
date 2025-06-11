import fs from "fs";
import path from "path";
import multer from "multer";
import express from "express";
import { fileURLToPath } from "url";
import {
  uploadFile,
  deleteFile,
  displayFiles,
} from "../../Controllers/materialController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

const router = express.Router();

router.post("/upload-file", upload.single("file"), uploadFile);
router.post("/delete-file", deleteFile);
router.get("/:category/:subject", displayFiles);

export default router;

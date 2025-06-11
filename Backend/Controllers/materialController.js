import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Only PDF files are allowed!" });

  const { name, category, subject, year } = req.body;

  if (!category)
    return res.status(400).json({ message: "Category is required" });
  if (!subject) return res.status(400).json({ message: "Subject is required" });

  const metaData = {
    id: Date.now(),
    originalName: name,
    storedName: req.file.filename,
    path: `uploads/${req.file.filename}`, // ✅ fixed: removed leading slash
    year: category === "pastpapers" ? parseInt(year) : undefined,
    category,
    subject,
    uploadedAt: new Date().toISOString(),
  };

  const dataDir = path.join(__dirname, "..", "data");
  const dataPath = path.join(dataDir, "files.json");

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  let fileData = [];
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath);
    fileData = JSON.parse(raw);
  }

  const existing = fileData.find(
    (file) =>
      file.path === metaData.path &&
      file.category === category &&
      file.subject === subject
  );

  if (existing) {
    return res
      .status(400)
      .json({ message: "File already exists in this category and subject" });
  }

  fileData.push(metaData);
  fs.writeFileSync(dataPath, JSON.stringify(fileData, null, 2));

  res
    .status(201)
    .json({ message: "File uploaded successfully", file: metaData });
};

export const deleteFile = (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "File ID is required" });

  const dataPath = path.join(__dirname, "..", "data", "files.json");
  const uploadsDir = path.join(__dirname, "..", "uploads"); // ✅ correct absolute path

  if (!fs.existsSync(dataPath)) {
    return res.status(404).json({ message: "No file records found" });
  }

  let files = JSON.parse(fs.readFileSync(dataPath));
  const fileToDelete = files.find((f) => f.id === id);

  if (!fileToDelete) {
    return res.status(404).json({ message: "File not found" });
  }

  const absoluteFilePath = path.join(uploadsDir, fileToDelete.storedName); // ✅ safer than using .path

  // Log to debug
  console.log("Deleting file from disk:", absoluteFilePath);

  try {
    if (fs.existsSync(absoluteFilePath)) {
      fs.unlinkSync(absoluteFilePath);
      console.log("File deleted from disk.");
    } else {
      console.warn("File not found on disk:", absoluteFilePath);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete physical file",
      error: err.message,
    });
  }

  // Update metadata
  files = files.filter((f) => f.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(files, null, 2));

  res.json({ message: "File deleted successfully" });
};

export const displayFiles = (req, res) => {
  const { category, subject } = req.params;
  const dataPath = path.join(__dirname, "../data/files.json");

  if (!fs.existsSync(dataPath)) {
    return res.status(200).json([]);
  }

  const allFiles = JSON.parse(fs.readFileSync(dataPath));
  const filteredFiles = allFiles.filter(
    (file) =>
      file.category.toLowerCase() === category.toLowerCase() &&
      file.subject.toLowerCase() === subject.toLowerCase()
  );

  res.status(200).json(filteredFiles);
};

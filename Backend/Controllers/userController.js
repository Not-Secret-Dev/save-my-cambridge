// importing modules
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

// resolving the path to json file which contains the users data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userPath = path.resolve(__dirname, "../data/users/user.json");

export const signUpUser = (req, res) => {
  try {
    const { name, email, pass, role } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!fs.existsSync(userPath)) {
      fs.mkdirSync(path.dirname(userPath), { recursive: true });
      fs.writeFileSync(userPath, "[]");
    }

    const users = JSON.parse(fs.readFileSync(userPath, "utf8"));
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = bcrypt.hashSync(pass, 10);
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    };

    users.push(newUser);
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));

    // If you want frontend to auto-login after signup:
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req, res) => {
  const { email, pass } = req.body;

  // validation
  if (!email || !pass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // creating users
  if (!fs.existsSync(userPath)) {
    fs.mkdirSync(path.dirname(userPath), { recursive: true });
    fs.writeFileSync(userPath, "[]");
  }
  const users = JSON.parse(fs.readFileSync(userPath, "utf8"));
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPassCorrect = bcrypt.compareSync(pass, user.password);
  if (!isPassCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "2h" }
  );

  // confirminig that the user has been registered
  res.status(200).json({
    message: "Logged in successfully",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "User ID is required!" });

  if (!fs.existsSync(userPath)) {
    return res.status(404).json({ message: "User storage not found" });
  }

  const users = JSON.parse(fs.readFileSync(userPath, "utf8"));
  const filteredUsers = users.filter((user) => user.id != Number(id));

  if (filteredUsers.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }
  fs.writeFileSync(userPath, JSON.stringify(filteredUsers, null, 2));
  return res.status(201).json({ message: "User deleted successfully" });
};

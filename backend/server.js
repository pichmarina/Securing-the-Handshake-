require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const app = express();
const PORT = process.env.PORT || 5001;

const contacts = [];

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use(
  csurf({
    cookie: true,
  }),
);

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized: session invalid" });
  }
  next();
}

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    req.session.user = { username };
    return res.json({ message: "Login successful", user: req.session.user });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

app.get("/api/contacts", requireLogin, (req, res) => {
  res.json({ contacts });
});

app.post("/api/contacts", requireLogin, (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
  };

  contacts.push(newContact);

  res.status(201).json({
    message: "Contact added successfully",
    contact: newContact,
  });
});

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid or missing CSRF token" });
  }

  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

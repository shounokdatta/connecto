// backend/server.js
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { app, server } from "./lib/socket.js";
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

// Setup
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Static file serving for production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));

  })
}

// Root test route
app.get("/", (req, res) => {
    res.send("server is running");
}); 

connectDB()
  .then(() => {
    server.listen(port,'0.0.0.0', () => {
      console.log("✅ Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
  });

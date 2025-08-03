import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import { app, server } from "./lib/socket.js";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

const port = process.env.PORT || 5000;

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Serve frontend build files
const frontendPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// For all other routes, serve React's index.html
// Catch-all for React Router (must be after API routes)
app.get(/^(?!\/api).*/, (req, res) => {
  console.log(frontendPath);
  res.sendFile(path.join(frontendPath, "index.html"));
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

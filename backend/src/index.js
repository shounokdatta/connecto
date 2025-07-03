import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

const port = 5000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
    res.send("server is running");
}); 

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
});

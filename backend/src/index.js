import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

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

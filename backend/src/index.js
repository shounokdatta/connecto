import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';

dotenv.config();
const app = express();

app.use(express.json());

const port = 5000;

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("server is running");
}); 

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
});

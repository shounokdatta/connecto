// seedAI.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js"; // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const aiUserId = new mongoose.Types.ObjectId("0000000000000000000000a1");

    const exists = await User.findById(aiUserId);
    if (!exists) {
      await User.create({
        _id: aiUserId,
        name: "AI Assistant",
        email: "ai@connecto.com",
        password: "hashed-password-or-placeholder",
      });
      console.log("✅ AI User created.");
    } else {
      console.log("ℹ️ AI User already exists.");
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error connecting to DB:", err);
  });

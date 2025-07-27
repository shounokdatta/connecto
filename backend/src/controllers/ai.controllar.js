// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const getAIResponse = async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ reply: "No prompt provided." });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ reply: text });
//   } catch (error) {
//     console.error("AI Error:", error.message);
//     res.status(500).json({ reply: "AI error occurred." });
//   }
// };

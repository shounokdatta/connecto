import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb+srv://dattashounok:MCoud6qYoT4H09QP@cluster0.s8j52wf.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
};

export default connectDB;

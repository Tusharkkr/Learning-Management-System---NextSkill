import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
  }
}

export default ConnectDb
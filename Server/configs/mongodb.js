import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Error");
    console.log(error.message);
    process.exit(1);
  }
}

export default ConnectDb
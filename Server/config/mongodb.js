import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    mongoose.connection.on('connected',()=>
        console.log('DB Connected')
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
  } catch (error) {
    console.log("MongoDB Connection Error")
  }
}

export default ConnectDb
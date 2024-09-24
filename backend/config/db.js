const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MONGO_URI;

 const connectDB = async () => {
  try {
    // Connect to MongoDB using mongoose
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error); 
   
  }
};

module.exports = connectDB

 

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error("DB_URI is not defined");
}

const db = async () => {
  try {
    const { connection } = await mongoose.connect(uri);
    if (connection.readyState === 1) {
      console.log("Connected successfully to MongoDB Atlas");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("Connection to MongoDB Atlas failed", error);
    return Promise.reject(false);
  }
};

export default db;

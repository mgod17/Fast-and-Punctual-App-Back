import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

if (!uri) {
  console.error("DB_URL not defined in .env");
  process.exit(1);
}

const db = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB Atlas", db.connection.db.databaseName);
  } catch (error) {
    console.log("Connection to MongoDB Atlas failed", error);
  }
};

export default db;

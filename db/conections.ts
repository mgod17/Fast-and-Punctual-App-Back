import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

if (!url) {
  console.error("DB_URL not defined in .env");
  process.exit(1);
}

const db = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    console.log("Connected successfully to MongoDB Atlas");
  } catch (error) {
    console.log("Connection to MongoDB Atlas failed", error);
  } finally {
    await client.close();
  }
};

export default db;

import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGO_URI;
const DATABASE_NAME = process.env.MONGO_DB_NAME;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(DATABASE_URL as string, {
    dbName: DATABASE_NAME,
  });
}

export default connectDB;

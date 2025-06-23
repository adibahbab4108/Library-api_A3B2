import mongoose from "mongoose";
import { customConfig } from "./env.config";
const { mongo_uri } = customConfig;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to DB");
  } catch (e) {
    console.log("MongoDB connection failed",e);
  }
};

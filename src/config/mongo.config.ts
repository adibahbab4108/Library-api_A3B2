import mongoose from "mongoose";
import { config } from "./env.config.js";
const { mongo_uri } = config;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to DB");
  } catch (e) {
    console.log("MongoDB connection failed",e);
  }
};

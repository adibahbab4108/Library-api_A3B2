import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  node_env: string;
  mongo_uri: string;
}

export const customConfig: Config = {
  port: Number(process.env.PORT) || 5000,
  node_env: process.env.NODE_ENV || "development",
  mongo_uri: (() => {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    return process.env.MONGO_URI;
  })(),
};

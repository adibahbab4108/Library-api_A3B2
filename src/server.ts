import app from "./app";
import { customConfig } from "./config/env.config";
import { connectToDatabase } from "./config/mongo.config";

const { port } = customConfig;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("Listening to port ", port);
    });
  })
  .catch((error) => {
    console.log("Failed to Start server", error);
    // process.exit(1);
  });
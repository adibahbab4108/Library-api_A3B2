//  Server entry point (connects to DB, starts server)
import app from "./app";
import { connectToDatabase } from "./config/mongo.config";
import { config } from "./config/env.config";

const { port } = config;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("Listening to port ", port);
    });
  })
  .catch((error) => {
    console.log("Failed to Start server", error);
    process.exit(1);
  });

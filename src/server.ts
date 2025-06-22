//  Server entry point (connects to DB, starts server)
import app from "./app.js";
import { connectToDatabase } from "./config/mongo.config.js";
import { config } from "./config/env.config.js";

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

//  Express app setup and middleware configuration
import express, { Application } from "express";
import bookRoutes from "./routes/book.router";
const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api", bookRoutes);

export default app;

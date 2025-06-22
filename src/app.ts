//  Express app setup and middleware configuration
import express, { Application } from "express";
import bookRoutes from "./routes/book.routes.js";
import borrowBookRoutes from "./routes/borrowBook.routes.js";
const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api", bookRoutes);
app.use("/api", borrowBookRoutes);

export default app;

//  Express app setup and middleware configuration
import express, { Application } from "express";
import bookRoutes from "./routes/book.routes";
import borrowBookRoutes from "./routes/borrowBook.routes";
const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api", bookRoutes);
app.use("/api", borrowBookRoutes);

export default app;

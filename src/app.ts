//  Express app setup and middleware configuration
import express, { Application } from "express";
import bookRoutes from "./routes/book.routes";
import borrowBookRoutes from "./routes/borrowBook.routes";
import cors from "cors";
const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api", bookRoutes);
app.use("/api", borrowBookRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


export default app;

import express from "express";
import { borrowBookHandler } from "../controller/borrowBook.controller.js";

const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/borrow", borrowBookHandler);

export default borrowBookRoutes;

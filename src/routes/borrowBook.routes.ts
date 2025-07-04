import express from "express";
import { borrowBookHandler, getBorrowedBook } from "../controller/borrowBook.controller";

const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/borrow", borrowBookHandler);
borrowBookRoutes.get("/borrowed-books", getBorrowedBook);

export default borrowBookRoutes;

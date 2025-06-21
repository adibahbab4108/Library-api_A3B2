import express from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controller/book.controller";
const bookRoutes = express.Router();

bookRoutes.get("/books", getAllBooks);
bookRoutes.post("/books", createBook);
bookRoutes.get("/books/:bookId", getBookById);
bookRoutes.put("/books/:bookId", updateBook);
bookRoutes.delete("/books/:bookId", deleteBook);

export default bookRoutes;

import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const bookExist = await Book.findOne({ isbn: data.isbn });

    if (bookExist) {
      res.status(409).json({ message: "Book already exists" });
    }

    const bookData = await Book.create(data);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;
  const findByFilter: any = {};
  const limitNumber: number = parseInt(limit as string, 10);

  try {
    if (filter) {
      findByFilter.genre = filter;
    }

    const data = await Book.find(findByFilter)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(limitNumber);

    res.send({ success: true, message: "Books retrieved successfully", data });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong", error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.bookId;

  try {
    const data = await Book.findById(id);
    if (data)
      res.json({ success: true, message: "Book retrieved successfully", data });
    else res.json({ success: false, message: "Book Not Found" });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const bookData = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: bookData },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unexpected error",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  try {
    const data = await Book.deleteOne({ _id: id });
    res.json({ success: true, message: "Book deleted successfully", data });
  } catch (error) {
    res.json({ success: false, message: "Cannot delete", error });
  }
};

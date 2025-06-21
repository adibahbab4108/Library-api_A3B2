import { Request, Response } from "express";
import { book } from "../models/book.model";

export const createBook = async (req: Request, res: Response): Promise<any> => {
  const data = req.body;

  try {
    const bookExist = await book.findOne({ isbn: data.isbn });

    if (bookExist) {
      return res.status(409).json({ message: "Book already exists" });
    }

    const bookData = await book.create(data);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;
  const findByFilter: any = {};
  const limitNumber: number = parseInt(limit as string, 10) || 5; // limit as string: Tells TypeScript “trust me, this is a string”. But in Js it's String(limit) which is type conversion

  if (filter) {
    findByFilter.genre = filter;
  }

  const data = await book
    .find(findByFilter)
    .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
    .limit(limitNumber);
  res.send({ success: true, message: "Books retrieved successfully", data });
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const data = await book.findById(id);
  res.json({ success: true, message: "Book retrieved successfully", data });
};

export const updateBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const bookData = req.body;

  const data = await book.findByIdAndUpdate(
    { _id: id },
    { $set: bookData },
    { new: true }
  );

  res.json({ success: true, message: "Book updated successfully", data });
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const data = await book.deleteOne({ _id: id });
  res.json({ success: true, message: "Book deleted successfully", data });
};

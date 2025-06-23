import { Request, Response } from "express";
import { borrowBook } from "../models/borrowBook.model";
import { book } from "../models/book.model";

export const borrowBookHandler = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const bookExist = await book.findById(bookId);

    if (!bookExist) {
      res.json({ success: false, message: "Book not found" });
      return;
    }

    if (bookExist.copies < quantity) {
      res.json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    bookExist.copies -= quantity;
    bookExist.updateAvailability();
    await bookExist.save();

    const borrowedBook = await borrowBook.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowedBook,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

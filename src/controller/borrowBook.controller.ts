import { Request, Response } from "express";
import { book } from "../models/book.model.js";
import { borrowBook } from "../models/borrowBook.model.js";

export const borrowBookHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { book: bookId, quantity, dueDate } = req.body;
  const bookExist = await book.findById(bookId);

  if (!bookExist) {
    return res.json({ success: false, message: "Book not found" });
  }

  if (bookExist.copies < quantity)
    return res.json({ success: false, message: "Not enough copies available" });

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
};

import { Request, Response } from "express";
import { BorrowBook } from "../models/borrowBook.model";
import { Book } from "../models/book.model";

export const borrowBookHandler = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const bookExist = await Book.findById(bookId);

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

    const borrowedBook = await BorrowBook.create({
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

export const getBorrowedBook = async (req: Request, res: Response) => {
  try {
    const borrowed = await BorrowBook.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowed,
    });
  } catch (error:any) {
    res.json({ success: false, message: error.message });
  }
};

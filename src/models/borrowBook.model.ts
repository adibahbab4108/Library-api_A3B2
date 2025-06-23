import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowBook.interface";

const borrowBookSchema = new Schema<IBorrowBook>(
  {
    book: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: {
      type: Number,
      min: [0, "Must be positive"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: (v: Date) => v > new Date(),
        message: "Due date must be in the future",
      },
    },
  },
  { timestamps: true }
);
export const BorrowBook = model<IBorrowBook>("BorrowBook", borrowBookSchema);

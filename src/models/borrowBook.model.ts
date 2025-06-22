import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrowBook.interface";

const borrowBookSchema = new Schema<IBorrowBook>(
  {
    book: { type: Schema.Types.ObjectId, required: true, ref: "book" },
    quantity: {
      type: Number,
      min: [0, "Must be positive"],
      required: true,
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);
export const borrowBook = model<IBorrowBook>("borrowBook", borrowBookSchema);

import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, unique: true },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger, // decimal hoile false dibe then message will show
        message: "Copies must be a whole number",
      },
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const book = model<IBook>("book", bookSchema);

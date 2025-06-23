import { Model, model, Schema } from "mongoose";
import { BookMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookMethods>(
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

bookSchema.method("updateAvailability", function updateAvailability() {
  this.available = this.copies > 0;
});

//make available:true after new copies are added
bookSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) return;
  const updatedCopies = doc.get("copies");
  const availabeStatus = doc.get("available");
  if (updatedCopies > 0 && availabeStatus === false) doc.set("available", true);
  await doc.save();
});

export const Book = model("Book", bookSchema);

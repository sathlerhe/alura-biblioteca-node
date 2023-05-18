import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "Book title is required"] },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "writers",
    required: [true, "Book writer is required"],
  },
  publisher: { type: String, required: [true, "Book publisher is required"] },
  numberOfPages: { type: Number },
});

const books = mongoose.model("books", bookSchema);

export default books;

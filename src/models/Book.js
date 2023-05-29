import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, "Book title is required"],
    validate: {
      validator: (value) => {
        return value.trim().length > 1 && value.trim().length <= 200;
      },
      message: "Book title should be between 2 and 200",
    },
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "writers",
    required: [true, "Book writer is required"],
  },
  publisher: { type: String, required: [true, "Book publisher is required"] },
  numberOfPages: {
    type: Number,
    min: [5, "numberOfPages should be between 5 and 5000"],
    max: [5000, "numberOfPages should be between 5 and 5000"],
  },
});

const books = mongoose.model("books", bookSchema);

export default books;

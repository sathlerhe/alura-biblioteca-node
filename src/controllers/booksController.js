import NotFoundError from "../errors/NotFoundError.js";
import books from "../models/Book.js";

class BooksController {
  static listBooks = async (req, res, next) => {
    try {
      const booksRes = await books.find().populate("writer").exec();

      res.status(200).json(booksRes);
    } catch (err) {
      next(err);
    }
  };

  static listEspecificBook = async (req, res, next) => {
    try {
      const { id } = req.params;

      const booksRes = await books.findById(id).populate("writer").exec();

      if (booksRes !== null) return res.status(200).json(booksRes);

      return next(new NotFoundError("Book id not found"));
    } catch (err) {
      next(err);
    }
  };

  static searchBooks = async (req, res, next) => {
    try {
      const { publisher, title } = req.query;

      const newPublisher = publisher || "";
      const newTitle = title || "";

      const booksRes = await books.find({
        publisher: { $regex: ".*" + newPublisher + ".*", $options: "i" },
        title: { $regex: ".*" + newTitle + ".*", $options: "i" },
      });

      return res.status(200).json(booksRes);
    } catch (err) {
      next(err);
    }
  };

  static createNewBook = async (req, res, next) => {
    try {
      const body = req.body;

      const newBook = {
        title: body.title,
        writer: body.writer,
        publisher: body.publisher,
        numberOfPages: body.numberOfPages || null,
      };

      const bookRes = await books.create(newBook);
      return res.status(201).json(bookRes);
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const booksRes = await books.findOneAndUpdate(
        { _id: id },
        { $set: body }
      );

      if (booksRes !== null) return res.status(201).json(booksRes);

      return next(new NotFoundError("Book id not found"));
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params;

      const booksRes = await books.findOneAndDelete({ _id: id });

      if (booksRes !== null) return res.status(201).json(booksRes);

      return next(new NotFoundError("Book id not found"));
    } catch (err) {
      next(err);
    }
  };
}

export default BooksController;

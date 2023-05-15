import books from "../models/Book.js";

class BooksController {
  static listBooks = async (req, res) => {
    try {
      const booksRes = await books.find().populate("writer").exec();

      res.status(200).json(booksRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static listEspecificBook = async (req, res) => {
    try {
      const { id } = req.params;

      const booksRes = await books.findById(id).populate("writer").exec();

      return res.status(200).json(booksRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static searchBooks = async (req, res) => {
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
      return res.status(500).json(err);
    }
  };

  static createNewBook = async (req, res) => {
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
      return res.status(500).json(err);
    }
  };

  static updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const booksRes = await books.findOneAndUpdate(
        { _id: id },
        { $set: body }
      );

      return res.status(201).json(booksRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const { id } = req.params;

      const booksRes = await books.findOneAndDelete({ _id: id });

      return res.status(201).json(booksRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

export default BooksController;

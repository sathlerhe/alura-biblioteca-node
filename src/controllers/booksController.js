import books from "../models/Book.js";

class BooksController {
  static listBooks = (req, res) => {
    books
      .find()
      .populate("writer")
      .exec((err, books) => {
        res.status(200).json(books);
      });
  };

  static listEspecificBook = (req, res) => {
    const { id } = req.params;

    books
      .findById(id)
      .populate("writer")
      .exec((err, book) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(book);
      });
  };

  static searchBooks = (req, res) => {
    const { publisher, title } = req.query;

    const newPublisher = publisher || "";
    const newTitle = title || "";

    books.find(
      {
        publisher: { $regex: ".*" + newPublisher + ".*", $options: "i" },
        title: { $regex: ".*" + newTitle + ".*", $options: "i" },
      },
      {},
      (err, books) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(books);
      }
    );
  };

  static createNewBook = (req, res) => {
    const body = req.body;

    const newBook = {
      title: body.title,
      writer: body.writer,
      publisher: body.publisher,
      numberOfPages: body.numberOfPages || null,
    };

    books.create(newBook, (err, book) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(book);
    });
  };

  static updateBook = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    books.findOneAndUpdate({ _id: id }, { $set: body }, (err, book) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(book);
    });
  };

  static deleteBook = (req, res) => {
    const { id } = req.params;

    books.findOneAndDelete({ _id: id }, (err, book) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(book);
    });
  };
}

export default BooksController;

import BadRequest from "../errors/BadRequest.js";
import NotFoundError from "../errors/NotFoundError.js";
import { books, writers } from "../models/index.js";

class BooksController {
  static listBooks = async (req, res, next) => {
    try {
      let { limit = 5, page = 1, ordenation = "_id:-1" } = req.query;

      let [sortBy, order] = ordenation.split(":");

      limit = parseInt(limit);
      page = parseInt(page);
      order = parseInt(order);

      if (limit < 0 || page < 0) return next(new BadRequest());

      const booksRes = await books
        .find()
        .sort({
          [sortBy]: order,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("writer")
        .exec();

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
      const { publisher, title, minPages, maxPages, writer } = req.query;

      let search = {};

      if (publisher)
        search.publisher = { $regex: ".*" + publisher + ".*", $options: "i" };
      if (title) search.title = { $regex: ".*" + title + ".*", $options: "i" };
      if (minPages || maxPages) search.numberOfPages = {};
      if (minPages) search.numberOfPages.$gte = minPages;
      if (maxPages) search.numberOfPages.$lte = maxPages;
      if (writer) {
        const writerRes = await writers.findOne({ name: writer });

        if (writer === null) return (search = null);

        search.writer = writerRes?._id;
      }

      if (search === null) return res.status(200).send([]);

      const booksRes = await books.find(search).populate("writer");

      return res.status(200).json(booksRes);
    } catch (err) {
      console.log(err);
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
        numberOfPages: body.numberOfPages,
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

import express from "express";
import BooksController from "../controllers/booksController.js";
import pagination from "../middlewares/pagination.js";

const booksRouter = express.Router();

booksRouter.get("/books", BooksController.listBooks, pagination);

booksRouter.get("/books/search", BooksController.searchBooks,  pagination);

booksRouter.get("/books/:id", BooksController.listEspecificBook);

booksRouter.post("/books", BooksController.createNewBook);

booksRouter.put("/books/:id", BooksController.updateBook);

booksRouter.delete("/books/:id", BooksController.deleteBook);

export default booksRouter;

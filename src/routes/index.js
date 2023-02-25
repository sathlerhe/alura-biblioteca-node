import express from "express";
import booksRouter from "./booksRoutes.js";
import writersRouter from "./writersRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("API Biblioteca");
  });

  app.use(express.json(), booksRouter, writersRouter);
};

export default routes;

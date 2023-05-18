import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import NotFoundHandler from "./middlewares/NotFoundHandler.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();

routes(app);

app.use(NotFoundHandler)
app.use(errorHandler);

export default app;

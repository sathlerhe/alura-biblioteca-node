import express from "express";
import WritersController from "../controllers/writersController.js";
import pagination from "../middlewares/pagination.js";

const writersRouter = express.Router();

writersRouter.get("/writers", WritersController.listWriters,  pagination);

writersRouter.get("/writers/search", WritersController.searchWriters);

writersRouter.get("/writers/:id", WritersController.listEspecificWriter);

writersRouter.post("/writers", WritersController.createNewWriter);

writersRouter.put("/writers/:id", WritersController.updateWriter);

writersRouter.delete("/writers/:id", WritersController.deleteWriter);

export default writersRouter;

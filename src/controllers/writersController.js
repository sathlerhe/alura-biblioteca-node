import NotFoundError from "../errors/NotFoundError.js";
import { writers } from "../models/index.js";

class WritersController {
  static listWriters = async (req, res, next) => {
    try {
      const writersRes = await writers.find();

      res.status(200).json(writersRes);
    } catch (err) {
      next(err);
    }
  };

  static listEspecificWriter = async (req, res, next) => {
    try {
      const { id } = req.params;

      const writersRes = await writers.findById(id);

      if (writersRes !== null) return res.status(200).json(writersRes);

      return next(new NotFoundError("Writer id not found"));
    } catch (err) {
      next(err);
    }
  };

  static searchWriters = async (req, res, next) => {
    try {
      const { name } = req.query;

      const writersRes = await writers.find({
        name: { $regex: ".*" + name + ".*", $options: "i" },
      });

      return res.status(200).json(writersRes);
    } catch (err) {
      next(err);
    }
  };

  static createNewWriter = async (req, res, next) => {
    try {
      const body = req.body;

      const writersRes = await writers.create({ ...body });

      return res.status(201).json(writersRes);
    } catch (err) {
      next(err);
    }
  };

  static updateWriter = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const writersRes = await writers.findOneAndUpdate(
        { _id: id },
        { $set: body }
      );

      if (writersRes !== null) return res.status(201).json(writersRes);

      return next(new NotFoundError("Writer id not found"));
    } catch (err) {
      next(err);
    }
  };

  static deleteWriter = async (req, res, next) => {
    try {
      const { id } = req.params;
      const writersRes = await writers.findOneAndDelete({ _id: id });

      if (writersRes !== null) return res.status(201).json(writersRes);

      return next(new NotFoundError("Writer id not found"));
    } catch (err) {
      next(err);
    }
  };
}

export default WritersController;

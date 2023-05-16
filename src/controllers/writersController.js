import writers from "../models/Writer.js";

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

      if (writersRes !== null) {
        return res.status(200).json(writersRes);
      } else {
        return res.status(404).send({ message: "Id do autor não localizado" });
      }
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

      return res.status(201).json(writersRes);
    } catch (err) {
      next(err);
    }
  };

  static deleteWriter = async (req, res, next) => {
    try {
      const { id } = req.params;
      const writersRes = await writers.findOneAndDelete({ _id: id });
      return res.status(201).json(writersRes);
    } catch (err) {
      next()
    }
  };
}

export default WritersController;

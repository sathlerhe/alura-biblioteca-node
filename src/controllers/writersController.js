import mongoose from "mongoose";
import writers from "../models/Writer.js";

class WritersController {
  static listWriters = async (req, res) => {
    try {
      const writersRes = await writers.find();

      res.status(200).json(writersRes);
    } catch (err) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listEspecificWriter = async (req, res) => {
    try {
      const { id } = req.params;

      const writersRes = await writers.findById(id);
      
      if (writersRes !== null) {
        return res.status(200).json(writersRes);
      } else {
        return res.status(404).send({ message: "Id do autor não localizado" });
      }
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos." });
      }

      return res.status(500).json(err);
    }
  };

  static searchWriters = async (req, res) => {
    try {
      const { name } = req.query;

      const writersRes = await writers.find({
        name: { $regex: ".*" + name + ".*", $options: "i" },
      });

      return res.status(200).json(writersRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static createNewWriter = async (req, res) => {
    try {
      const body = req.body;

      const writersRes = await writers.create({ ...body });

      return res.status(201).json(writersRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static updateWriter = async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const writersRes = await writers.findOneAndUpdate(
        { _id: id },
        { $set: body }
      );

      return res.status(201).json(writersRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static deleteWriter = async (req, res) => {
    try {
      const { id } = req.params;
      const writersRes = await writers.findOneAndDelete({ _id: id });
      return res.status(201).json(writersRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

export default WritersController;

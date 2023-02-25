import writers from "../models/Writer.js";

class WritersController {
  static listWriters = (req, res) => {
    writers.find((err, writers) => {
      res.status(200).json(writers);
    });
  };

  static listEspecificWriter = (req, res) => {
    const { id } = req.params;

    writers.findById(id, (err, writer) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(writer);
    });
  };

  static searchWriters = (req, res) => {
    const { name } = req.query;

    writers.find(
      {
        name: { $regex: ".*" + name + ".*", $options: "i" },
      },
      {},
      (err, writers) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(writers);
      }
    );
  };

  static createNewWriter = (req, res) => {
    const body = req.body;

    writers.create({ ...body }, (err, writer) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(writer);
    });
  };

  static updateWriter = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    writers.findOneAndUpdate({ _id: id }, { $set: body }, (err, writer) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(writer);
    });
  };

  static deleteWriter = (req, res) => {
    const { id } = req.params;

    writers.findOneAndDelete({ _id: id }, (err, writer) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json(writer);
    });
  };
}

export default WritersController;

import mongoose from "mongoose";

export function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessage = Object.values(error.errors)
      .map(err => err.message)

    return res.status(400).send({ message: errorMessage })
  }

  return res.status(500).json(error);
}

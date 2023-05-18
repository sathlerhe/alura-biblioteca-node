import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";

export function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return new ValidationError(error).sendResponse(res)
  }

  return new BaseError().sendResponse(res);
}

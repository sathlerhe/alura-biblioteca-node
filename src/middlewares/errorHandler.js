import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";

export function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(res);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return new ValidationError(error).sendResponse(res)
  }

  if (error instanceof BaseError) {
    return error.sendResponse(res)
  }

  return new BaseError().sendResponse(res);
}

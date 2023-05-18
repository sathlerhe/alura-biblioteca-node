import BaseError from "./BaseError.js";

export default class NotFoundError extends BaseError {
  constructor(message = "Page not found") {
    super(message, 404)
  }
}
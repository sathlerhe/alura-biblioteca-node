import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(error) {
    const errorMessage = Object.values(error.errors).map((err) => err.message);

    super(errorMessage);
  }
}

export default ValidationError;
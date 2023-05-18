import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest {
  constructor(error) {
    const errorMessage = Object.values(error.errors).map((err) => err.message);

    super(errorMessage);
  }
}

export default ValidationError;
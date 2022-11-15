import StatusCodes from './StatusCodes';

class CustomError extends Error {
  public message: string;
  public statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;

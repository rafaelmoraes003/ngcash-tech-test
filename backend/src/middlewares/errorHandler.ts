import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../types/StatusCodes';
import CustomError from '../types/CustomError';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res
    .status(err.statusCode ? err.statusCode : StatusCodes.SERVER_ERROR)
    .json({ error: err.message });
};

export default errorHandler;

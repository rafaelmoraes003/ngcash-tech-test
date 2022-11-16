/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import StatusCodes from '../types/StatusCodes';
import { JWT_SECRET } from '../utils/getToken';
import CustomRequest from '../types/CustomRequest';
import IUser from '../types/IUser';

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: 'Token not found',
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as IUser & { id?: number };
    req.userId = user.id as number;
    next();
  } catch (err: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
  }
};

export default auth;

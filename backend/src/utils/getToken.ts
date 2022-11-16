import jwt from 'jsonwebtoken';
import User from '../database/models/user';

export const JWT_SECRET = 'jwtsecret';

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getToken = (payload: User): string => {
  const token = jwt.sign({ ...payload }, JWT_SECRET, JWT_CONFIG as jwt.SignOptions);
  return token;
};

export default getToken;

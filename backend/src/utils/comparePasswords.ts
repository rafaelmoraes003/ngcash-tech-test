import CustomError from '../types/CustomError';
import StatusCodes from '../types/StatusCodes';

const comparePasswords = (dbHash: string, loginHash: string): void => {
  if (dbHash !== loginHash) {
    throw new CustomError('Password is incorrect', StatusCodes.UNAUTHORIZED);
  }
};

export default comparePasswords;

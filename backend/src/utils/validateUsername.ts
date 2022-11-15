import CustomError from '../types/CustomError';
import User from '../database/models/user';
import StatusCodes from '../types/StatusCodes';

const validateUsername = async (username: string): Promise<void> => {
  const user = await User.findOne({ where: { username } });
  if (user) {
    throw new CustomError('User already exists.', StatusCodes.BAD_REQUEST);
  }
};

export default validateUsername;

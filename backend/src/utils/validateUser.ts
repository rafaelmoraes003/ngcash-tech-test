import { ModelStatic } from 'sequelize';
import CustomError from '../types/CustomError';
import User from '../database/models/user';
import StatusCodes from '../types/StatusCodes';

const validateUser = async (
  username: string,
  userModel: ModelStatic<User>,
): Promise<User | void> => {
  const user = await userModel.findOne({ where: { username } });
  if (!user) throw new CustomError('User does not exists.', StatusCodes.BAD_REQUEST);
  return user;
};

export default validateUser;

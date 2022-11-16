import { ModelStatic } from 'sequelize';
import CustomError from '../types/CustomError';
import User from '../database/models/user';
import StatusCodes from '../types/StatusCodes';

const getUser = async (username: string, userModel: ModelStatic<User>): Promise<number> => {
  const user = await userModel.findOne({
    where: { username },
  });
  if (!user) throw new CustomError('User not found', StatusCodes.NOT_FOUND);
  return user.id;
};

export default getUser;

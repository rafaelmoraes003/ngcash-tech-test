/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModelStatic, Sequelize } from 'sequelize';
import User from '../database/models/user';
import Account from '../database/models/account';
import IUser from '../types/IUser';
import * as config from '../database/config/connection';
import getPasswordHash from './getPasswordHash';
import CustomError from '../types/CustomError';
import StatusCodes from '../types/StatusCodes';

const registerTransaction = async (
  userData: IUser,
  accountModel: ModelStatic<Account>,
  userModel: ModelStatic<User>,
): Promise<User> => {
  const sequelize = new Sequelize(config);
  const { username, password } = userData;
  try {
    const result = await sequelize.transaction(async (t) => {
      const { id } = await accountModel.create({ balance: 10000 }, { transaction: t });
      const hashedPassword = getPasswordHash(password);
      const newUser = await userModel.create({
        username, password: hashedPassword, accountId: id,
      }, { transaction: t });
      return newUser;
    });
    return result;
  } catch (error: any) {
    throw new CustomError(error.errors[0].message, StatusCodes.SERVER_ERROR);
  }
};

export default registerTransaction;

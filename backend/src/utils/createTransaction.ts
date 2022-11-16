/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';
import Account from '../database/models/account';
import * as config from '../database/config/connection';
import CustomError from '../types/CustomError';
import StatusCodes from '../types/StatusCodes';
import Transaction from '../database/models/transaction';

const createTransaction = async (
  creditedAccId: number,
  debitedAccId: number,
  value:number,
): Promise<Transaction> => {
  const sequelize = new Sequelize(config);
  try {
    const result = await sequelize.transaction(async (t) => {
      await Account.increment({ balance: value }, { where: { id: creditedAccId } });
      await Account.decrement({ balance: value }, { where: { id: debitedAccId } });
      const newTransaction = await Transaction.create({
        debitedAccountId: debitedAccId,
        creditedAccountId: creditedAccId,
        value,
      }, { transaction: t });
      return newTransaction;
    });
    return result;
  } catch (error: any) {
    throw new CustomError(error.errors[0].message, StatusCodes.SERVER_ERROR);
  }
};

export default createTransaction;

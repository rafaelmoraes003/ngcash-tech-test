import CustomError from '../types/CustomError';
import Account from '../database/models/account';
import StatusCodes from '../types/StatusCodes';

const verifyBalance = async (accountId: number, balance: number): Promise<void> => {
  const account = await Account.findOne({ where: { id: accountId } }) as Account;
  if (balance > account.balance) {
    throw new CustomError('Insufficient balance.', StatusCodes.BAD_REQUEST);
  }
};

export default verifyBalance;

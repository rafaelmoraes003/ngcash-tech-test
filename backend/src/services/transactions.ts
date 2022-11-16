import { ModelStatic, Op } from 'sequelize';
import getUser from '../utils/getUser';
import User from '../database/models/user';
import verifyBalance from '../utils/verifyBalance';
import createTransaction from '../utils/createTransaction';
import StatusCodes from '../types/StatusCodes';
import validateAccountsIds from '../utils/validateAccountsIds';
import Transaction from '../database/models/transaction';
import userJOIN from '../utils/userJoin';
import validateBody from '../utils/validateBody';
import IDateAndTransaction, { zodDateAndTransactionSchema } from '../types/IDateAndTransaction';
import ITransaction, { zodTransactionSchema } from '../types/ITransaction';

class TransactionService {
  private _transactionModel: ModelStatic<Transaction>;
  private _userModel: ModelStatic<User>;

  constructor(userModel: ModelStatic<User>, transactionModel: ModelStatic<Transaction>) {
    this._userModel = userModel;
    this._transactionModel = transactionModel;
  }

  public async create(debitedAccId: number, transactionData: ITransaction) {
    validateBody(transactionData, zodTransactionSchema);
    const { creditedAccountUsername, value } = transactionData;
    await verifyBalance(debitedAccId, value * 100);
    const creditedAccId = await getUser(creditedAccountUsername, this._userModel);
    validateAccountsIds(creditedAccId, debitedAccId);
    const newTransaction = await createTransaction(creditedAccId, debitedAccId, value * 100);
    return { code: StatusCodes.OK, data: newTransaction };
  }

  public async getById(userId: number) {
    const transactions = await this._transactionModel.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: userId },
          { creditedAccountId: userId },
        ],
      },
      include: userJOIN,
    });
    return { code: StatusCodes.OK, data: transactions };
  }

  public async getByDateAndType(userId: number, filters: IDateAndTransaction) {
    const { date, type } = filters;
    validateBody({ date, type }, zodDateAndTransactionSchema);
    const transactionTye = type === 'cash-out'
      ? 'debitedAccountId' : 'creditedAccountId';
    const transactions = await this._transactionModel.findAll({
      include: userJOIN,
      where: { [transactionTye]: userId },
      order: [
        ['createdAt', date],
      ],
    });
    return { code: StatusCodes.OK, data: transactions };
  }
}

export default TransactionService;

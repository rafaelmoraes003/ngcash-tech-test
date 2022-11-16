import { ModelStatic } from 'sequelize';
import StatusCodes from '../types/StatusCodes';
import Account from '../database/models/account';
import CustomError from '../types/CustomError';

class AccountService {
  private _accountModel: ModelStatic<Account>;

  constructor(accountModel: ModelStatic<Account>) {
    this._accountModel = accountModel;
  }

  public async getUserAccount(accountId: number) {
    const account = await this._accountModel.findOne({
      where: { id: accountId },
    });
    if (!account) throw new CustomError('Account not found', StatusCodes.NOT_FOUND);
    return { code: StatusCodes.OK, data: account };
  }
}

export default AccountService;

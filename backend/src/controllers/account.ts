import { NextFunction, Response } from 'express';
import CustomRequest from '../types/CustomRequest';
import AccountService from '../services/account';

class AccountController {
  private _accountService: AccountService;

  constructor(accountService: AccountService) {
    this._accountService = accountService;
  }

  public getUserAccount = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    try {
      const { code, data } = await this._accountService.getUserAccount(Number(userId));
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default AccountController;

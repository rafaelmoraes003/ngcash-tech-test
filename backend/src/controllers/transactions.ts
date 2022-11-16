import { NextFunction, Response } from 'express';
import CustomRequest from '../types/CustomRequest';
import TransactionService from '../services/transactions';
import IDateAndTransaction from '../types/IDateAndTransaction';

class TransactionController {
  private _transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this._transactionService = transactionService;
  }

  public create = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { creditedAccountUsername, value } = req.body;
    try {
      const { code, data } = await this._transactionService.create(
        userId as number,
        { creditedAccountUsername, value },
      );
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionController;

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

  public getById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    try {
      const { code, data } = await this._transactionService.getById(Number(userId));
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getByDateAndType = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { date, type } = req.query;
    try {
      const { code, data } = await this._transactionService.getByDateAndType(
        Number(userId),
        { date, type } as IDateAndTransaction,
      );
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionController;

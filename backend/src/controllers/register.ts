import { NextFunction, Request, Response } from 'express';
import RegisterService from '../services/register';

class RegisterController {
  private _registerService: RegisterService;

  constructor(registerService: RegisterService) {
    this._registerService = registerService;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const { code, data } = await this._registerService.register({ username, password });
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default RegisterController;

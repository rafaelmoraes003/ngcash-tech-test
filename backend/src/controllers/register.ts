import { NextFunction, Request, Response } from 'express';
import RegisterService from '../database/services/register';

class RegisterController {
  public static register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const { code, data } = await RegisterService.register({ username, password });
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default RegisterController;

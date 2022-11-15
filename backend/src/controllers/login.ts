import { NextFunction, Response, Request } from 'express';
import LoginService from '../services/login';

class LoginController {
  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const { code, data } = await this._loginService.login({ username, password });
      return res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;

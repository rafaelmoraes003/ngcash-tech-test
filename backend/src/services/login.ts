import { ModelStatic } from 'sequelize';
import validateUser from '../utils/validateUser';
import IUser from '../types/IUser';
import User from '../database/models/user';
import getPasswordHash from '../utils/getPasswordHash';
import comparePasswords from '../utils/comparePasswords';
import getToken from '../utils/getToken';
import StatusCodes from '../types/StatusCodes';

class LoginService {
  private _userModel: ModelStatic<User>;

  constructor(userModel: ModelStatic<User>) {
    this._userModel = userModel;
  }

  public async login(userData: IUser) {
    const { username, password } = userData;
    const user = await validateUser(username, this._userModel) as User;
    const hashedPassword = getPasswordHash(password);
    comparePasswords(user.password, hashedPassword);
    const token = getToken(user.dataValues);
    return { code: StatusCodes.OK, data: { ...user.dataValues, token } };
  }
}

export default LoginService;

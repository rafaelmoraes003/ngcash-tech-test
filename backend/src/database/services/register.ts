import { ModelStatic } from 'sequelize';
import IUser, { zodUserSchema } from '../../types/IUser';
import validateBody from '../../utils/validateBody';
import registerTransaction from '../../utils/registerTransaction';
import StatusCodes from '../../types/StatusCodes';
import validateUsername from '../../utils/validateUsername';
import getToken from '../../utils/getToken';
import User from '../models/user';
import Account from '../models/account';

class RegisterService {
  private _userModel: ModelStatic<User>;
  private _accountModel: ModelStatic<Account>;

  constructor(userModel: ModelStatic<User>, accountModel: ModelStatic<Account>) {
    this._userModel = userModel;
    this._accountModel = accountModel;
  }

  public async register(userData: IUser) {
    validateBody(userData, zodUserSchema);
    await validateUsername(userData.username);
    const newUser = await registerTransaction(
      userData,
      this._accountModel,
      this._userModel,
    );
    const token = getToken(newUser.dataValues);
    return { code: StatusCodes.OK, data: { ...newUser.dataValues, token } };
  }
}

export default RegisterService;

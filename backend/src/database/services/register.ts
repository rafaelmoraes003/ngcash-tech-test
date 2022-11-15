import IUser, { zodUserSchema } from '../../types/IUser';
import validateBody from '../../utils/validateBody';
import registerTransaction from '../../utils/registerTransaction';
import StatusCodes from '../../types/StatusCodes';
import validateUsername from '../../utils/validateUsername';
import getToken from '../../utils/getToken';

class RegisterService {
  public static async register(userData: IUser) {
    validateBody(userData, zodUserSchema);
    await validateUsername(userData.username);
    const newUser = await registerTransaction(userData);
    const token = getToken(newUser.dataValues);
    return { code: StatusCodes.OK, data: { ...newUser.dataValues, token } };
  }
}

export default RegisterService;

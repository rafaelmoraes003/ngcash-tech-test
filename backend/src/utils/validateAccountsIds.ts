import StatusCodes from '../types/StatusCodes';
import CustomError from '../types/CustomError';

const validateAccountsIds = (creditedId: number, debitedId: number): void => {
  if (creditedId === debitedId) {
    throw new CustomError('You cannot transfer money to yourself.', StatusCodes.BAD_REQUEST);
  }
};

export default validateAccountsIds;

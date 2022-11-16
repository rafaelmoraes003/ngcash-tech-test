import User from '../database/models/user';

const userJOIN = [
  {
    model: User,
    as: 'debitedAccountUsername',
    attributes: { exclude: ['id', 'password', 'accountId'] },
  },
  { model: User,
    as: 'creditedAccountUsername',
    attributes: { exclude: ['id', 'password', 'accountId'] },
  },
];

export default userJOIN;

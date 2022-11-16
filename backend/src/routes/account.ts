import { Router } from 'express';
import auth from '../middlewares/auth';
import AccountController from '../controllers/account';
import Account from '../database/models/account';
import AccountService from '../services/account';

const account = Router();

const accountService = new AccountService(Account);
const accountController = new AccountController(accountService);

account.get('/', auth, accountController.getUserAccount);

export default account;

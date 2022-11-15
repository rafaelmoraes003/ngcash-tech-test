import { Router } from 'express';
import RegisterService from '../services/register';
import Account from '../database/models/account';
import User from '../database/models/user';
import RegisterController from '../controllers/register';

const register = Router();

const registerService = new RegisterService(User, Account);
const registerController = new RegisterController(registerService);

register.post('/', registerController.register);

export default register;

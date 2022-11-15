import { Router } from 'express';
import LoginController from '../controllers/login';
import LoginService from '../database/services/login';
import User from '../database/models/user';

const login = Router();

const loginService = new LoginService(User);
const loginController = new LoginController(loginService);

login.post('/', loginController.login);

export default login;

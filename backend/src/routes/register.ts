import { Router } from 'express';
import RegisterController from '../controllers/register';

const register = Router();

register.post('/', RegisterController.register);

export default register;

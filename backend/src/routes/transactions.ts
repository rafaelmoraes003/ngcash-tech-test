import { Router } from 'express';
import auth from '../middlewares/auth';
import TransactionController from '../controllers/transactions';
import TransactionService from '../services/transactions';
import User from '../database/models/user';
import Transaction from '../database/models/transaction';

const transaction = Router();

const transactionService = new TransactionService(User, Transaction);
const transactionController = new TransactionController(transactionService);

transaction.post('/', auth, transactionController.create);
transaction.get('/', auth, transactionController.getById);
transaction.get('/filter', auth, transactionController.getByDateAndType);

export default transaction;

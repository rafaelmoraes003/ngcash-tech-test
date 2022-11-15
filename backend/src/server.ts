import express, { Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import StatusCodes from './types/StatusCodes';
import registerRoute from './routes/register';
import loginRoute from './routes/login';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/', async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ ok: true });
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});

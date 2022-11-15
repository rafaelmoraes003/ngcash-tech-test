import express, { Request, Response } from 'express';
import StatusCodes from './types/StatusCodes';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});

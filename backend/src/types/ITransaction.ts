import { z } from 'zod';

export const zodTransactionSchema = z.object({
  creditedAccountUsername: z.string().min(3),
  value: z.number().gt(0),
});

type ITransaction = z.infer<typeof zodTransactionSchema>;

export default ITransaction;

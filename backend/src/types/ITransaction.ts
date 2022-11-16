import { z } from 'zod';

export const zodTransactionSchema = z.object({
  creditedAccountUsername: z.string().min(3),
  value: z.number().int(),
});

type ITransaction = z.infer<typeof zodTransactionSchema>;

export default ITransaction;

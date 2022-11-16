import { z } from 'zod';

export const zodDateAndTransactionSchema = z.object({
  date: z.enum(['DESC', 'ASC'], {
    required_error: 'date is required.',
  }),
  type: z.enum(['cash-out', 'cash-in'], {
    required_error: 'type is required.',
  }),
});

type IDateAndTransaction = z.infer<typeof zodDateAndTransactionSchema>;

export default IDateAndTransaction;

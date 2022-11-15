import { z } from 'zod';

export const zodUserSchema = z.object({
  username: z.string({
    required_error: 'username is required',
    invalid_type_error: 'Name must be a string',
  }).min(3),
  password: z.string({
    required_error: 'password is required',
  }).regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g, {
    message: 'password must be a string, contain at least one number and capital letter',
  }).min(8),
});

type IUser = z.infer<typeof zodUserSchema>;

export default IUser;

import { z } from 'zod';
import CustomError from '../types/CustomError';
import StatusCodes from '../types/StatusCodes';

const validateBody = (
  obj: unknown,
  schema: z.ZodObject<z.ZodRawShape>,
): void => {
  const parsedObj = schema.safeParse(obj);
  let errorMessage;

  if (!parsedObj.success) {
    errorMessage = parsedObj.error.issues[0].message;
    throw new CustomError(
      errorMessage,
      StatusCodes.BAD_REQUEST,
    );
  }
};

export default validateBody;

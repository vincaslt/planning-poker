import { ServerRequest } from 'microrouter';
import { createError } from 'micro';
import { STATUS_ERROR } from '../constants';

export function getQuery<
  T extends { [index in R]: string } & { [index in O]: string | undefined },
  R extends string,
  O extends string
>(req: ServerRequest, requiredKeys: R[] = [], optionalKeys: O[] = []): T {
  const missingKey = requiredKeys.find(key => req.query[key] === undefined);

  if (missingKey) {
    throw createError(
      STATUS_ERROR.BAD_REQUEST,
      `Missing parameter ${missingKey}`
    );
  }

  return Object.entries(req.query).reduce((query, [key, value]) => {
    if (!requiredKeys.includes(key as R) && !optionalKeys.includes(key as O)) {
      throw createError(
        STATUS_ERROR.BAD_REQUEST,
        `Unexpected parameter ${key}`
      );
    }
    return { ...query, [key]: value };
  }, {} as T);
}

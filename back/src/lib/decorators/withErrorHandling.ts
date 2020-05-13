import { RequestHandler, send } from 'micro';

export function withErrorHandling(handler: RequestHandler): RequestHandler {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (e) {
      if (e.statusCode) {
        return send(res, e.statusCode, {
          status: e.statusCode,
          message: e.message
        });
      }

      throw e;
    }
  };
}

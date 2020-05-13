import { RequestHandler, send } from 'micro';
import { STATUS_SUCCESS, STATUS_ERROR } from '../constants';

const isProduction = process.env.NODE_ENV === 'production';
const URL = process.env.PUBLIC_URL;

const ALLOW_METHODS = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

const ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept',
];

const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export function withCors(handler: RequestHandler): RequestHandler {
  return async (req, res) => {
    const allowedOrigins = [URL];

    const origin = Array.isArray(req.headers.origin)
      ? req.headers.origin[0]
      : req.headers.origin;

    if (!isProduction) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (!origin || !allowedOrigins.includes(origin)) {
      return send(res, STATUS_ERROR.FORBIDDEN);
    } else {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', ALLOW_METHODS.join(','));
      res.setHeader('Access-Control-Allow-Headers', ALLOW_HEADERS.join(','));
      res.setHeader('Access-Control-Max-Age', String(MAX_AGE_SECONDS));
      return send(res, STATUS_SUCCESS.OK);
    }

    return await handler(req, res);
  };
}

import { RequestHandler } from 'micro';
import { router } from 'microrouter';
import { flatten } from 'ramda';

/**
 * Creates a handler which invokes handler for path it's mapped to.
 * @param handlers microrouter resource handlers (post, get, etc.)
 */
export function withRouter(...handlers: RequestHandler[] | RequestHandler[][]) {
  return router(...flatten(handlers));
}

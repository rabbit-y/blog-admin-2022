/**
 * @desc 说说列表
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {
  /** current */
  current;
  /** size */
  size;
}

export const init = new defs.JsonResult();

export function request(params, options = {}) {
  return PontCore.fetch(PontCore.getUrl('/mood', params, 'GET'), {
    method: 'GET',

    ...options,
  });
}

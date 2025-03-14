/**
 * @desc 类型列表
 */

import * as defs from '../../baseClass';
import { PontCore } from '../../pontCore';

export class Params {}

export const init = new defs.JsonResult();

export function request(params, options = {}) {
  return PontCore.fetch(PontCore.getUrl('/type', params, 'GET'), {
    method: 'GET',

    ...options,
  });
}

/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type HandlerError } from '../internals/handler'

/*****************************************************************************************************************/

export function isDataResult<T>(result: T | HandlerError): result is T {
  return result !== undefined && (result as HandlerError).error === undefined
}

/*****************************************************************************************************************/

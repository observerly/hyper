/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { $fetch } from 'ofetch'

/*****************************************************************************************************************/

/**
 *
 * fetchHandler()
 *
 * @description An ofetch handler that can be used to make requests to an API.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://github.com/unjs/ofetch
 *
 * @param req - of type Request
 * @returns - promise of unwrapped Response of generic data type <T>
 *
 */
export const fetchHandler = <T>(req: Request) => {
  const { url, method, headers, body } = req

  const options = {
    method,
    headers,
    body,
    credentials: 'include' as RequestCredentials
  }

  return $fetch<T>(url, options)
}

/*****************************************************************************************************************/

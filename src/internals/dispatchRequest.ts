/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { fetchHandler } from './fetchHandler'

/*****************************************************************************************************************/

/**
 *
 * dispatchRequest()
 *
 * @description An request dispatcher that wraps the fetch API and injects the client headers at runtime.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @see https://github.com/unjs/ofetch
 *
 * @param url - URL to fetch
 * @param init - RequestInit
 * @param headers - async function that returns a Headers object
 * @returns - promise of unwrapped Response of generic data type <T>
 *
 */
export const dispatchRequest = async <T>(
  url: URL,
  init?: RequestInit,
  headers?: () => Promise<Headers> | Headers
) => {
  const req = new Request(url, init)

  if (headers) {
    const requestHeaders = await headers()

    // Merge the asynced headers from the client with the request headers:
    requestHeaders.forEach((value, key) => {
      req.headers.set(key, value)
    })
  }

  return await fetchHandler<T>(req)
}

/*****************************************************************************************************************/

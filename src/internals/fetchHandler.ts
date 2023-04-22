/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { $fetch, type FetchOptions } from 'ofetch'

import { type HandlerError } from './handler'

/*****************************************************************************************************************/

type MaybeErrorResponse<T> = T | HandlerError

type FetchHandlerReturn<T> = Promise<MaybeErrorResponse<T>>

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
export const fetchHandler = <T>(req: Request, data?: string): FetchHandlerReturn<T> => {
  const { url, method, headers } = req

  let options = {
    method,
    headers,
    credentials: 'include' as RequestCredentials
  } as FetchOptions<'json'>

  if (['POST', 'PUT', 'PATCH'].includes(method) && data) {
    options = {
      ...options,
      body: JSON.parse(data)
    }
  }

  try {
    return $fetch<T>(url, options)
  } catch (error) {
    if (error instanceof Error) {
      return Promise.resolve({
        error: error.message
      })
    }

    if (typeof error === 'string') {
      return Promise.resolve({
        error
      })
    }

    return Promise.resolve({
      error: 'An unknown error occurred.'
    })
  }
}

/*****************************************************************************************************************/

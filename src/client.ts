/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type Handler } from './internals/handler'

/*****************************************************************************************************************/

export type CreateClientOptions = {
  /**
   * 
   * @description The base URL to use for all requests.
   * 
   */
  base?: URL
  /**
   * 
   * @description An object containing properties that are set on the request before it is sent.
   * 
   */
  init?: RequestInit
  /**
   * 
   * @description A function that returns a Headers object or a Promise that resolves to a Headers object.
   * @optional
   * 
   */
  headers?: () => Headers | Promise<Headers>
  /**
   * 
   * @description Whether or not to send cookies in the request.
   * @optional
   * 
   */
  credentials?: boolean
}

/*****************************************************************************************************************/

const DEFAULT_BASE_URL = new URL('http://localhost:3000/api/v1/')

/*****************************************************************************************************************/

/**
 * 
 * createHyperClient()
 * 
 * @description Creates a client object that can be used to make requests to an API.
 * @param routes 
 * @param options  
 * @returns 
 */
export const createHyperClient = <const T extends Record<string, readonly Handler<any>[]>>(
  routes: (base: URL, init?: RequestInit, headers?: (() => Headers | Promise<Headers>)) => T, 
  options?: CreateClientOptions
) => {
  const { base = DEFAULT_BASE_URL, init = {}, headers } = options || {
    base: DEFAULT_BASE_URL,
    init: {}
  }

  const client = {} as {
    [K in keyof T]: {
      [N in T[K][number]["name"]]: Extract<T[K][number], { name: N }>["action"]
    }
  }

  const router = routes(base, init, headers)

  Object.entries(router).forEach(([route, handlers]) => {
    handlers.forEach((handler) => {
      client[route as keyof T] = {
        ...client[route as keyof T],
        [handler.name]: handler.action
      } as any
    })
  })

  return client
}

/*****************************************************************************************************************/

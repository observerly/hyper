/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const camera = (base: URL, init?: RequestInit, headers?: () => Promise<Headers> | Headers) =>
  [
    {
      name: 'isConnected',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('camera/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    }
  ] as const

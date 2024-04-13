/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const exposure = (
  base: URL,
  init?: RequestInit,
  headers?: () => Promise<Headers> | Headers
) =>
  [
    {
      name: 'isReady',
      action: <
        T = {
          complete: boolean
          progress: number
          ready: boolean
        }
      >() => {
        const url = new URL('exposure/ready', base)
        return dispatchRequest<T>(url, init, headers)
      }
    }
  ] as const

/*****************************************************************************************************************/

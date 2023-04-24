/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const filterwheel = (
  base: URL,
  init?: RequestInit,
  headers?: () => Promise<Headers> | Headers
) =>
  [
    {
      name: 'isConnected',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('filterwheel/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getPosition',
      action: <
        T = {
          position: number
        }
      >() => {
        const url = new URL('filterwheel/position', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getNames',
      action: <
        T = {
          names: string[]
        }
      >() => {
        const url = new URL('filterwheel/names', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'initialise',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('filterwheel/init', base)
        return dispatchRequest<T>(url, { ...init, method: 'PUT' }, headers)
      }
    }
  ] as const

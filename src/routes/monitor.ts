/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const monitor = (
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
        const url = new URL('monitor/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'isSafe',
      action: <
        T = {
          safe: boolean
        }
      >() => {
        const url = new URL('monitor/safe', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          connected: boolean
          safe: boolean
        }
      >() => {
        const url = new URL('monitor/status', base)
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
        const url = new URL('monitor/init', base)
        return dispatchRequest<T>(url, { ...init, method: 'PUT' }, headers)
      }
    },
    {
      name: 'connect',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('monitor/connect', base)

        const data = JSON.stringify({ connect: true })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ connect: true })
          },
          headers,
          data
        )
      }
    },
    {
      name: 'disconnect',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('monitor/connect', base)

        const data = JSON.stringify({ connect: false })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ connect: false })
          },
          headers,
          data
        )
      }
    }
  ] as const

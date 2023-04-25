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
    },
    {
      name: 'connect',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('filterwheel/connect', base)

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
        const url = new URL('filterwheel/connect', base)

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
    },
    {
      name: 'setPosition',
      action: <
        T = {
          position: number
        }
      >(body: {
        position: number
      }) => {
        const url = new URL('filterwheel/position', base)

        const data = JSON.stringify(body)

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify(body)
          },
          headers,
          data
        )
      }
    },
    {
      name: 'setFilter',
      action: <
        T = {
          position: number
        }
      >(body: {
        filter: string
      }) => {
        const url = new URL('filterwheel/name', base)

        const data = JSON.stringify(body)

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify(body)
          },
          headers,
          data
        )
      }
    }
  ] as const

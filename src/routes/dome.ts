/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const dome = (base: URL, init?: RequestInit, headers?: () => Promise<Headers> | Headers) =>
  [
    {
      name: 'isConnected',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('dome/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'isSlewing',
      action: <
        T = {
          slewing: boolean
        }
      >() => {
        const url = new URL('dome/slewing', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getCoordinates',
      action: <
        T = {
          alt: number
          az: number
        }
      >() => {
        const url = new URL('dome/coordinates', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          connected: boolean
          slewing: boolean
          slaved: boolean
          parked: boolean
          home: boolean
          shutter: string
        }
      >() => {
        const url = new URL('dome/status', base)
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
        const url = new URL('dome/init', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'connect',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('dome/connect', base)

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
        const url = new URL('dome/connect', base)

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
      name: 'openShutter',
      action: <
        T = {
          status: string
        }
      >() => {
        const url = new URL('dome/shutter', base)

        const data = JSON.stringify({ open: true })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ open: true })
          },
          headers,
          data
        )
      }
    },
    {
      name: 'closeShutter',
      action: <
        T = {
          status: string
        }
      >() => {
        const url = new URL('dome/shutter', base)

        const data = JSON.stringify({ open: false })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ open: false })
          },
          headers,
          data
        )
      }
    },
    {
      name: 'couple',
      action: <
        T = {
          coupled: boolean
        }
      >() => {
        const url = new URL('dome/couple', base)

        const data = JSON.stringify({ couple: true })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ couple: true })
          },
          headers,
          data
        )
      }
    },
    {
      name: 'decouple',
      action: <
        T = {
          coupled: boolean
        }
      >() => {
        const url = new URL('dome/couple', base)

        const data = JSON.stringify({ couple: false })

        return dispatchRequest<T>(
          url,
          {
            ...init,
            method: 'PUT',
            body: JSON.stringify({ couple: false })
          },
          headers,
          data
        )
      }
    }
  ] as const

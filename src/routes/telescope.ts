/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const telescope = (
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
        const url = new URL('telescope/connected', base)
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
        const url = new URL('telescope/slewing', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'isTracking',
      action: <
        T = {
          tracking: boolean
        }
      >() => {
        const url = new URL('telescope/tracking', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getConfiguration',
      action: <
        T = {
          apertureArea: number
          apertureDiameter: number
          focalLength: number
        }
      >() => {
        const url = new URL('telescope/config', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getCoordinates',
      action: <
        T = {
          ra: number
          dec: number
          az: number
          alt: number
        }
      >() => {
        const url = new URL('telescope/coordinates', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          connected: boolean
          slewing: boolean
          tracking: boolean
          parked: boolean
          home: boolean
          utc: string
        }
      >() => {
        const url = new URL('telescope/status', base)
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
        const url = new URL('telescope/init', base)
        return dispatchRequest<T>(url, { ...init, method: 'PUT' }, headers)
      }
    },
    {
      name: 'shutdown',
      action: <
        T = {
          connected: boolean
          slewing: boolean
          tracking: boolean
          parked: boolean
          home: boolean
          utc: string
        }
      >() => {
        const url = new URL('telescope/shutdown', base)

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
        const url = new URL('telescope/connect', base)

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
        const url = new URL('telescope/connect', base)

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
      name: 'slewToEquatorialCoordinate',
      action: <
        T = {
          slewing: true
        }
      >(body: {
        ra: number
        dec: number
      }) => {
        const url = new URL('telescope/slew/equatorial', base)

        const data = JSON.stringify(body)

        return dispatchRequest<T>(
          url,
          { ...init, method: 'PUT', body: JSON.stringify(body) },
          headers,
          data
        )
      }
    },
    {
      name: 'slewToHorizontalCoordinate',
      action: <
        T = {
          slewing: true
        }
      >(body: {
        az: number
        alt: number
      }) => {
        const url = new URL('telescope/slew/horizontal', base)

        const data = JSON.stringify(body)

        return dispatchRequest<T>(
          url,
          { ...init, method: 'PUT', body: JSON.stringify(body) },
          headers,
          data
        )
      }
    }
  ] as const

/*****************************************************************************************************************/

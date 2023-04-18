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
    }
  ] as const

/*****************************************************************************************************************/

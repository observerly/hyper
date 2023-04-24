/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const focuser = (
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
        const url = new URL('focuser/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getConfiguration',
      action: <
        T = {
          absolutePosition: boolean
          maxIncrement: number
          maxStep: number
          stepSize: number
        }
      >() => {
        const url = new URL('focuser/config', base)
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
        const url = new URL('focuser/position', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getTemperature',
      action: <
        T = {
          temperature: number
        }
      >() => {
        const url = new URL('focuser/temperature', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          connected: boolean
          moving: boolean
          position: number
        }
      >() => {
        const url = new URL('focuser/status', base)
        return dispatchRequest<T>(url, init, headers)
      }
    }
  ] as const

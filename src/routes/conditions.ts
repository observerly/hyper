/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export const conditions = (
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
        const url = new URL('conditions/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          cloudCover: number
          dewPoint: number
          humidity: number
          pressure: number
          rainRate: number
          skyBrightness: number
          skyQuality: number
          skyTemperature: number
          starFWHM: number
          temperature: number
          windDirection: number
          windGust: number
          windSpeed: number
        }
      >() => {
        const url = new URL('conditions/status', base)
        return dispatchRequest<T>(url, init, headers)
      }
    }
  ] as const

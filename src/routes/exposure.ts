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
    },
    {
      name: 'start',
      action: <
        T = {
          duration: number
          flat: boolean
          dark: boolean
          light: boolean
        }
      >(body: {
        duration: number
        flat: boolean
        dark: boolean
        light: boolean
      }) => {
        const url = new URL('exposure/start', base)

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
      name: 'stop',
      action: <T = {}>() => {
        const url = new URL('exposure/stop', base)

        return dispatchRequest<T>(url, { ...init, method: 'DELETE' }, headers)
      }
    }
  ] as const

/*****************************************************************************************************************/

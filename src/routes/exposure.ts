/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export type ExposureStorePayload = {
  bucketName: string
  userId: string
  uuid: string
  duration: number
  start: string
  filter: string
  isDark: boolean
  isFlat: boolean
  mimetype: string
  target: string
  mjd: number
  equinox: number
  ra: number
  dec: number
  telescope: string
  instrument: string
  observer: string
}

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
    },
    {
      name: 'store',
      action: <
        T = {
          ccdXSize: number
          ccdYSize: number
          isDark: boolean
          isFlat: boolean
          locations: string[]
          maxADU: number
          mimetype: string
          sensor: string
          userId: string
          uuid: string
        }
      >(
        body: ExposureStorePayload
      ) => {
        const url = new URL('exposure/store', base)

        const data = JSON.stringify(body)

        return dispatchRequest<T>(
          url,
          { ...init, method: 'POST', body: JSON.stringify(body) },
          headers,
          data
        )
      }
    }
  ] as const

/*****************************************************************************************************************/

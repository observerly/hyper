/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

/*****************************************************************************************************************/

export type CameraExposureStorePayload = {
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

export const camera = (base: URL, init?: RequestInit, headers?: () => Promise<Headers> | Headers) =>
  [
    {
      name: 'isConnected',
      action: <
        T = {
          connected: boolean
        }
      >() => {
        const url = new URL('camera/connected', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'isReady',
      action: <
        T = {
          complete: boolean
          progress: number
          ready: boolean
        }
      >() => {
        const url = new URL('camera/ready', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'shutdown',
      action: <
        T = {
          connected: boolean
          pulseGuiding: boolean
          coolerOn: boolean
          coolerPower: number
          CCDtemperature: number
          heatSinkTemperature: number
          state: string
        }
      >() => {
        const url = new URL('camera/shutdown', base)

        return dispatchRequest<T>(url, { ...init, method: 'DELETE' }, headers)
      }
    },
    {
      name: 'getConfiguration',
      action: <
        T = {
          asymmetricBin: boolean
          binX: number
          binY: number
          ccdXSize: number
          ccdYSize: number
          fastReadOut: boolean
          fullWellCapacity: number
          gain: number
          maxExposure: number
          minExposure: number
          pixelSizeX: number
          pixelSizeY: number
        }
      >() => {
        const url = new URL('camera/config', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getStatus',
      action: <
        T = {
          connected: boolean
          pulseGuiding: boolean
          coolerOn: boolean
          coolerPower: number
          CCDtemperature: number
          heatSinkTemperature: number
          state: string
        }
      >() => {
        const url = new URL('camera/status', base)
        return dispatchRequest<T>(url, init, headers)
      }
    },
    {
      name: 'getFastReadOutMode',
      action: <
        T = {
          fastReadOut: boolean
        }
      >() => {
        const url = new URL('camera/fastreadout', base)
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
        const url = new URL('camera/init', base)
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
        const url = new URL('camera/connect', base)

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
        const url = new URL('camera/connect', base)

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
      name: 'turnCoolerOn',
      action: <
        T = {
          connected: boolean
          pulseGuiding: boolean
          coolerOn: boolean
          coolerPower: number
          CCDtemperature: number
          heatSinkTemperature: number
          state: string
        }
      >() => {
        const url = new URL('camera/cooler', base)

        const data = JSON.stringify({ on: true })

        return dispatchRequest<T>(
          url,
          { ...init, method: 'PUT', body: JSON.stringify({ on: true }) },
          headers,
          data
        )
      }
    },
    {
      name: 'turnCoolerOff',
      action: <
        T = {
          connected: boolean
          pulseGuiding: boolean
          coolerOn: boolean
          coolerPower: number
          CCDtemperature: number
          heatSinkTemperature: number
          state: string
        }
      >() => {
        const url = new URL('camera/cooler', base)

        const data = JSON.stringify({ on: false })

        return dispatchRequest<T>(
          url,
          { ...init, method: 'PUT', body: JSON.stringify({ on: false }) },
          headers,
          data
        )
      }
    },
    {
      name: 'setCCDTemperature',
      action: <
        T = {
          connected: boolean
          pulseGuiding: boolean
          coolerOn: boolean
          coolerPower: number
          CCDtemperature: number
          heatSinkTemperature: number
          state: string
        }
      >(body: {
        temperature: number
      }) => {
        const url = new URL('camera/temperature', base)

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
      name: 'startExposure',
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
        const url = new URL('camera/exposure', base)

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
      name: 'stopExposure',
      action: <T = {}>() => {
        const url = new URL('camera/exposure', base)

        return dispatchRequest<T>(url, { ...init, method: 'DELETE' }, headers)
      }
    },
    {
      name: 'storeExposure',
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
        body: CameraExposureStorePayload
      ) => {
        const url = new URL('camera/store', base)

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

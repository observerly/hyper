/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { dispatchRequest } from '../internals/dispatchRequest'

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
      name: 'getFastReadOutMode',
      action: <
        T = {
          fastReadoutMode: boolean
        }
      >() => {
        const url = new URL('camera/fastreadout', base)
        return dispatchRequest<T>(url, init, headers)
      }
    }
  ] as const

/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const cameraHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/camera/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/camera/config',
    handler: eventHandler(_event => {
      return {
        asymmetricBin: false,
        binX: 1,
        binY: 1,
        ccdXSize: 0,
        ccdYSize: 0,
        fastReadOut: false,
        fullWellCapacity: 0,
        gain: 0,
        maxExposure: 0,
        minExposure: 0,
        pixelSizeX: 0,
        pixelSizeY: 0
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/camera/ready',
    handler: eventHandler(_event => {
      return {
        complete: true,
        progress: 100,
        ready: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/camera/fastreadout',
    handler: eventHandler(_event => {
      return {
        fastReadOut: false
      }
    })
  }
]

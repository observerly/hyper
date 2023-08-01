/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

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
    method: 'PUT',
    url: '/api/v1/camera/shutdown',
    handler: eventHandler(event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      return {
        connected: false,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
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
    url: '/api/v1/camera/status',
    handler: eventHandler(_event => {
      return {
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
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
  },
  {
    method: 'PUT',
    url: '/api/v1/camera/init',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: ['PUT', 'DELETE'],
    url: '/api/v1/camera/cooler',
    handler: eventHandler(event => {
      const method = getMethod(event)

      if (!['PUT', 'DELETE'].includes(method)) {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const status = {
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
      }

      if (method === 'PUT') {
        status.coolerOn = true
        return status
      }

      return status
    })
  },
  {
    method: ['PUT'],
    url: '/api/v1/camera/temperature',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ temperature: number }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: body.temperature,
        heatSinkTemperature: 0,
        state: 'idle'
      }
    })
  }
]

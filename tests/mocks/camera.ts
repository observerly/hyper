/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

import { type CameraExposureStorePayload } from '../../src/routes/camera'

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
    method: 'DELETE',
    url: '/api/v1/camera/shutdown',
    handler: eventHandler(event => {
      const method = getMethod(event)

      if (method !== 'DELETE') {
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
    method: 'PUT',
    url: '/api/v1/camera/connect',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ connect: boolean }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        connected: body.connect
      }
    })
  },
  {
    method: ['PUT'],
    url: '/api/v1/camera/cooler',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (!['PUT'].includes(method)) {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ on: boolean }>(event)

      const status = {
        connected: true,
        pulseGuiding: false,
        coolerOn: body.on,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
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
  },
  {
    method: ['PUT', 'DELETE'],
    url: '/api/v1/camera/exposure',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT' && method !== 'DELETE') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{
        duration: number
        flat: boolean
        dark: boolean
        light: boolean
      }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return method === 'PUT'
        ? {
            duration: 300,
            flat: false,
            dark: false,
            light: true
          }
        : {}
    })
  },
  {
    method: ['POST'],
    url: '/api/v1/camera/store',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<CameraExposureStorePayload>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        ccdXSize: 1463,
        ccdYSize: 1168,
        isDark: body.isDark,
        isFlat: body.isFlat,
        locations: [
          `gs://${body.bucketName}/${body.userId}/${body.uuid}/${body.target}_[${body.filter}]_monochrome_M_${body.duration}s_2021-05-15T03:00:00.000Z.fits`
        ],
        maxADU: 65535,
        mimetype: body.mimetype,
        sensor: 'Monochrome',
        userId: body.userId,
        uuid: body.uuid
      }
    })
  }
]

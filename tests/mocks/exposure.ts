/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

import { type ExposureStorePayload } from '../../src/routes/exposure'

/*****************************************************************************************************************/

export const exposureHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/exposure/ready',
    handler: eventHandler(_event => {
      return {
        complete: true,
        progress: 100,
        ready: true
      }
    })
  },
  {
    method: ['PUT'],
    url: '/api/v1/exposure/start',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
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

      return {
        duration: body.duration,
        flat: body.flat,
        dark: body.dark,
        light: body.light
      }
    })
  },
  {
    method: ['DELETE'],
    url: '/api/v1/exposure/stop',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'DELETE') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      return {}
    })
  },
  {
    method: ['POST'],
    url: '/api/v1/exposure/store',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<ExposureStorePayload>(event)

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

/*****************************************************************************************************************/

/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const filterwheelHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/filterwheel/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: ['GET', 'PUT'],
    url: '/api/v1/filterwheel/position',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method === 'PUT') {
        const body = await readBody<{ position: number }>(event)

        if (!body) {
          return new Response('Bad Request', {
            status: 400,
            statusText: 'Bad Request'
          })
        }

        return {
          position: body.position
        }
      }

      return {
        position: 0
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/filterwheel/names',
    handler: eventHandler(_event => {
      return {
        names: ['R', 'G', 'B', 'Ha', 'OIII', 'SII', 'L']
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/filterwheel/init',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      return {
        connected: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/filterwheel/connect',
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
    method: 'PUT',
    url: '/api/v1/filterwheel/name',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ filter: string }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        position: 1
      }
    })
  }
]

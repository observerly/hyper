/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const focuserHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/focuser/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/focuser/config',
    handler: eventHandler(_event => {
      return {
        absolutePosition: true,
        maxIncrement: 5,
        maxStep: 25000,
        stepSize: 10
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/focuser/temperature',
    handler: eventHandler(_event => {
      return {
        temperature: 20
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/focuser/status',
    handler: eventHandler(_event => {
      return {
        connected: true,
        moving: false,
        position: 10000
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/focuser/init',
    handler: eventHandler(event => {
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
    url: '/api/v1/focuser/connect',
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
    method: ['GET', 'PUT', 'DELETE'],
    url: '/api/v1/focuser/position',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (!['GET', 'PUT', 'DELETE'].includes(method)) {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      if (method === 'GET') {
        return {
          position: 10000
        }
      }

      if (method === 'DELETE') {
        return {
          position: 0
        }
      }

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
    })
  }
]

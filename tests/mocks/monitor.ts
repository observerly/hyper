/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const monitorHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/monitor/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/monitor/safe',
    handler: eventHandler(_event => {
      return {
        safe: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/monitor/status',
    handler: eventHandler(_event => {
      return {
        connected: true,
        safe: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/monitor/init',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/monitor/connect',
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
  }
]

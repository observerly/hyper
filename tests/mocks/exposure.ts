/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

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
  }
]

/*****************************************************************************************************************/

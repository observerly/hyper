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
    method: 'GET',
    url: '/api/v1/filterwheel/position',
    handler: eventHandler(_event => {
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
  }
]

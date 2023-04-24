/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod } from 'h3'

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
    url: '/api/v1/focuser/position',
    handler: eventHandler(_event => {
      return {
        position: 10000
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
  }
]

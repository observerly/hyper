/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const telescopeHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/telescope/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/slewing',
    handler: eventHandler(_event => {
      return {
        slewing: false
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/tracking',
    handler: eventHandler(_event => {
      return {
        tracking: false
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/config',
    handler: eventHandler(_event => {
      return {
        apertureArea: 0.0269,
        apertureDiameter: 0.0269,
        focalLength: 1.26
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/telescope/init',
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

/*****************************************************************************************************************/

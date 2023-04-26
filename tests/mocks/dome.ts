/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const domeHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/dome/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/slewing',
    handler: eventHandler(_event => {
      return {
        slewing: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/coordinates',
    handler: eventHandler(_event => {
      return {
        alt: 34.5619912,
        az: 56.1234567
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/status',
    handler: eventHandler(_event => {
      return {
        connected: true,
        slewing: true,
        slaved: true,
        parked: true,
        home: true,
        shutter: 'open'
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/init',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/connect',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  }
]

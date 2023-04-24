/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler } from 'h3'

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
  }
]

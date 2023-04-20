/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const rotatorHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/rotator/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  }
]

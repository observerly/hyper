/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const conditionsHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/conditions/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  }
]

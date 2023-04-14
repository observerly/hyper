/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const baseHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1',
    handler: eventHandler(_event => {
      return {
        description:
          'The observerly Fiber API for interoperating with an Alpaca ASCOM standards or INDI protocol compliant observatory (with Auth middleware) written in Go.',
        endpoint: '/api/v1',
        name: 'Fiber API by observerly',
        protocol: 'ASCOM Standards Alpaca API'
      }
    })
  }
]

/*****************************************************************************************************************/

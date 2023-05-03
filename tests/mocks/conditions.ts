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
  },
  {
    method: 'GET',
    url: '/api/v1/conditions/status',
    handler: eventHandler(_event => {
      return {
        cloudCover: 0,
        dewPoint: -1.6441718184205099,
        humidity: 50,
        pressure: 1020,
        rainRate: 0,
        skyBrightness: 85,
        skyQuality: 18,
        skyTemperature: -28,
        starFWHM: 0,
        temperature: 174,
        windDirection: 174,
        windGust: 2,
        windSpeed: 0
      }
    })
  }
]

/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

import { isDataResult } from '../src'

/*****************************************************************************************************************/

import { getURL, setupClient } from './setup'

/*****************************************************************************************************************/

suite('@observerly/hyper Fiber API Observing Conditions Client', () => {
  describe('conditionsRoutes', () => {
    it('should be able to determine the connection status of the conditions', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.conditions.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to get the status of the conditions', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.conditions.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
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
      })
    })
  })
})

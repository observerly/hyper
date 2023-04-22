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

suite('@observerly/hyper Fiber API Focuser Client', () => {
  describe('focuserRoutes', () => {
    it('should be able to determine the connection status of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.focuser.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the configuration of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const config = await client.focuser.getConfiguration()
      expect(isDataResult(config)).toBe(true)
      if (!isDataResult(config)) return
      expect(config).toStrictEqual({
        absolutePosition: true,
        maxIncrement: 5,
        maxStep: 25000,
        stepSize: 10
      })
    })
  })
})
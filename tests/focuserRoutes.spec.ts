/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

/*****************************************************************************************************************/

import { getURL, setupClient } from './setup'

/*****************************************************************************************************************/

suite('@observerly/hyper Fiber API Focuser Client', () => {
  describe('focuserRoutes', () => {
    it('should be able to determine the connection status of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.focuser.isConnected()
      expect(connected).toBe(true)
    })

    it('should be able to determine the configuration of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const config = await client.focuser.getConfiguration()
      const { absolutePosition, maxIncrement, maxStep, stepSize } = config
      expect(absolutePosition).toBe(true)
      expect(maxIncrement).toBe(5)
      expect(maxStep).toBe(25000)
      expect(stepSize).toBe(10)
    })
  })
})

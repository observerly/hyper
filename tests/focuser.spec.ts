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
  })
})

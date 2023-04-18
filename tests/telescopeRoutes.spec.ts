/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

/*****************************************************************************************************************/

import { getURL, setupClient } from './setup'

/*****************************************************************************************************************/

suite('@observerly/hyper Fiber API Telescope Client', () => {
  describe('telescopeRoutes', () => {
    it('should be able to determine the connection status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.telescope.isConnected()
      expect(connected).toBe(true)
    })

    it('should be able to determine the slewing status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { slewing } = await client.telescope.isSlewing()
      expect(slewing).toBe(false)
    })

    it('should be able to determine the tracking status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { tracking } = await client.telescope.isTracking()
      expect(tracking).toBe(false)
    })
  })
})

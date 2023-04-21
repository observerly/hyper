/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

/*****************************************************************************************************************/

import { getURL, setupClient } from './setup'

/*****************************************************************************************************************/

suite('@observerly/hyper Fiber API Rotator Client', () => {
  describe('rotatorRoutes', () => {
    it('should be able to determine the connection status of the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.rotator.isConnected()
      expect(connected).toBe(true)
    })

    it('should be able to determine the connection status of the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.rotator.initialise()
      expect(connected).toBe(true)
    })

    it('should be able to connect to the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.rotator.connect()
      expect(connected).toBe(true)
    })

    it('should be able to disconnect from the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.rotator.disconnect()
      expect(connected).toBe(false)
    })
  })
})

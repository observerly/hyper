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

suite('@observerly/hyper Fiber API Monitor Client', () => {
  describe('monitorRoutes', () => {
    it('should be able to determine the connection status of the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.monitor.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the safety status of the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isSafe = await client.monitor.isSafe()
      expect(isDataResult(isSafe)).toBe(true)
      if (!isDataResult(isSafe)) return
      expect(isSafe).toStrictEqual({ safe: true })
    })
  })
})
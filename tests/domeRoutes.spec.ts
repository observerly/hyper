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

suite('@observerly/hyper Fiber API Dome Client', () => {
  describe('domeRoutes', () => {
    it('should be able to determine the connection status of the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.dome.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the slewing status of the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isSlewing = await client.dome.isSlewing()
      expect(isDataResult(isSlewing)).toBe(true)
      if (!isDataResult(isSlewing)) return
      expect(isSlewing).toStrictEqual({ slewing: true })
    })
  })
})

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

suite('@observerly/hyper Fiber API Rotator Client', () => {
  describe('rotatorRoutes', () => {
    it('should be able to determine the connection status of the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.rotator.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the connection status of the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.rotator.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to connect to the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.rotator.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect from the rotator', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const disconnect = await client.rotator.disconnect()
      expect(isDataResult(disconnect)).toBe(true)
      if (!isDataResult(disconnect)) return
      expect(disconnect).toStrictEqual({ connected: false })
    })
  })
})

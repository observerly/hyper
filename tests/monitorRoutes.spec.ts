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

    it('should be able to determine the status of the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.monitor.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({ connected: true, safe: true })
    })

    it('should be able to initialise the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const initialise = await client.monitor.initialise()
      expect(isDataResult(initialise)).toBe(true)
      if (!isDataResult(initialise)) return
      expect(initialise).toStrictEqual({ connected: true })
    })

    it('should be able to connect to the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.monitor.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect from the monitor', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.monitor.disconnect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: false })
    })
  })
})

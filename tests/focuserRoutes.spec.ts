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

    it('should be able to determine the position of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const position = await client.focuser.getPosition()
      expect(isDataResult(position)).toBe(true)
      if (!isDataResult(position)) return
      expect(position).toStrictEqual({ position: 10000 })
    })

    it('should be able to determine the temperature of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const temperature = await client.focuser.getTemperature()
      expect(isDataResult(temperature)).toBe(true)
      if (!isDataResult(temperature)) return
      expect(temperature).toStrictEqual({ temperature: 20 })
    })

    it('should be able to determine the status of the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.focuser.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        moving: false,
        position: 10000
      })
    })

    it('should be able to initialise the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.focuser.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to connect to the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.focuser.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect to the focuser', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.focuser.disconnect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: false })
    })
  })
})

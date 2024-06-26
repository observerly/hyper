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

suite('@observerly/hyper Fiber API Filterwheel Client', () => {
  describe('filterwheelRoutes', () => {
    it('should be able to determine the connection status of the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.filterwheel.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the position of the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const position = await client.filterwheel.getPosition()
      expect(isDataResult(position)).toBe(true)
      if (!isDataResult(position)) return
      expect(position).toStrictEqual({ name: 'R', position: 0 })
    })

    it('should be able to determine the names of the filters in the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const names = await client.filterwheel.getNames()
      expect(isDataResult(names)).toBe(true)
      if (!isDataResult(names)) return
      expect(names).toStrictEqual({ names: ['R', 'G', 'B', 'Ha', 'OIII', 'SII', 'L'] })
    })

    it('should be able to initialise the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.filterwheel.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to connect to the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.filterwheel.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect to the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.filterwheel.disconnect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: false })
    })

    it('should be able to set the position of the filterwheel', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const position = await client.filterwheel.setPosition({ position: 0 })
      expect(isDataResult(position)).toBe(true)
      if (!isDataResult(position)) return
      expect(position).toStrictEqual({ position: 0 })
    })

    it('should be able to set the position of the filterwheel using the filter name', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const position = await client.filterwheel.setFilter({ name: 'R' })
      expect(isDataResult(position)).toBe(true)
      if (!isDataResult(position)) return
      expect(position).toStrictEqual({ position: 1 })
    })
  })
})

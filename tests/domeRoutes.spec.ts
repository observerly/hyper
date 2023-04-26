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

    it('should be able to determine the coordinates of the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const coordinates = await client.dome.getCoordinates()
      expect(isDataResult(coordinates)).toBe(true)
      if (!isDataResult(coordinates)) return
      expect(coordinates).toStrictEqual({ alt: 34.5619912, az: 56.1234567 })
    })

    it('should be able to determine the status of the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.dome.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        slewing: true,
        slaved: true,
        parked: true,
        home: true,
        shutter: 'open'
      })
    })

    it('should be able to initialize the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.dome.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to connect to the dome', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.dome.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })
  })
})

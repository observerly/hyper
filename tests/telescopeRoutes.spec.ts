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

suite('@observerly/hyper Fiber API Telescope Client', () => {
  describe('telescopeRoutes', () => {
    it('should be able to determine the connection status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.telescope.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to determine the slewing status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isSlewing = await client.telescope.isSlewing()
      expect(isDataResult(isSlewing)).toBe(true)
      if (!isDataResult(isSlewing)) return
      expect(isSlewing).toStrictEqual({ slewing: false })
    })

    it('should be able to determine the tracking status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isTracking = await client.telescope.isTracking()
      expect(isDataResult(isTracking)).toBe(true)
      if (!isDataResult(isTracking)) return
      expect(isTracking).toStrictEqual({ tracking: false })
    })

    it('should be able to determine the configuration of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const config = await client.telescope.getConfiguration()
      expect(isDataResult(config)).toBe(true)
      if (!isDataResult(config)) return
      expect(config).toStrictEqual({
        apertureArea: 0.0269,
        apertureDiameter: 0.0269,
        focalLength: 1.26
      })
    })

    it('should be able to determine the status of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.telescope.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      // Create a UTC now string:
      const utc = new Date('2021-05-14T00:00:00.000+00:00').toISOString()
      expect(status).toStrictEqual({
        connected: true,
        slewing: false,
        tracking: false,
        parked: false,
        home: false,
        utc
      })
    })

    it('should be able to initialise the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.telescope.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to shutdown the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const shutdown = await client.telescope.shutdown()
      expect(isDataResult(shutdown)).toBe(true)
      if (!isDataResult(shutdown)) return
      // Create a UTC now string:
      const utc = new Date('2021-05-14T00:00:00.000+00:00').toISOString()
      expect(shutdown).toStrictEqual({
        connected: false,
        slewing: false,
        tracking: false,
        parked: true,
        home: false,
        utc
      })
    })

    it('should be able to connect to the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const connect = await client.telescope.connect()
      expect(isDataResult(connect)).toBe(true)
      if (!isDataResult(connect)) return
      expect(connect).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect from the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const disconnect = await client.telescope.disconnect()
      expect(isDataResult(disconnect)).toBe(true)
      if (!isDataResult(disconnect)) return
      expect(disconnect).toStrictEqual({ connected: false })
    })

    it('should be able to get the equatorial and horizontal coordinates of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const coordinates = await client.telescope.getCoordinates()
      expect(isDataResult(coordinates)).toBe(true)
      if (!isDataResult(coordinates)) return

      const { ra, dec, az, alt } = coordinates

      // Right Ascension should be between 0 and 360
      expect(ra).toBeGreaterThanOrEqual(0)
      expect(ra).toBeLessThan(360)

      // Declination should be between -90 and 90
      expect(dec).toBeGreaterThan(-90)
      expect(dec).toBeLessThan(90)

      // Azimuth should be between 0 and 360
      expect(az).toBeGreaterThanOrEqual(0)
      expect(az).toBeLessThan(360)

      // Altitude should be between -90 and 90
      expect(alt).toBeGreaterThan(-90)
      expect(alt).toBeLessThan(90)
    })

    it('should be able to set the equatorial coordinates of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isSlewing = await client.telescope.slewToEquatorialCoordinate({
        ra: 0.0,
        dec: 0.0
      })
      expect(isDataResult(isSlewing)).toBe(true)
      if (!isDataResult(isSlewing)) return
      expect(isSlewing).toStrictEqual({ slewing: true })
    })

    it('should be able to set the horizontal coordinates of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isSlewing = await client.telescope.slewToHorizontalCoordinate({
        az: 23.012001,
        alt: 33.511206
      })
      expect(isDataResult(isSlewing)).toBe(true)
      if (!isDataResult(isSlewing)) return
      expect(isSlewing).toStrictEqual({ slewing: true })
    })
  })
})

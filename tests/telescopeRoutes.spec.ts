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

    it('should be able to determine the configuration of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const config = await client.telescope.getConfiguration()
      const { apertureArea, apertureDiameter, focalLength } = config
      expect(apertureArea).toBe(0.0269)
      expect(apertureDiameter).toBe(0.0269)
      expect(focalLength).toBe(1.26)
    })

    it('should be able to initialise the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.telescope.initialise()
      expect(connected).toBe(true)
    })

    it('should be able to connect to the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.telescope.connect()
      expect(connected).toBe(true)
    })

    it('should be able to disconnect from the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { connected } = await client.telescope.disconnect()
      expect(connected).toBe(false)
    })

    it('should be able to get the equatorial and horizontal coordinates of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { ra, dec, az, alt } = await client.telescope.getCoordinates()

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
      const { slewing } = await client.telescope.slewToEquatorialCoordinate({
        ra: 0.0,
        dec: 0.0
      })
      expect(slewing).toBe(true)
    })

    it('should be able to set the horizontal coordinates of the telescope', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const { slewing } = await client.telescope.slewToHorizontalCoordinate({
        az: 23.012001,
        alt: 33.511206
      })
      expect(slewing).toBe(true)
    })
  })
})

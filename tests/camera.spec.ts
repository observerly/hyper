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

suite('@observerly/hyper Fiber API Observing Camera Client', () => {
  describe('cameraRoutes', () => {
    it('should be able to determine the connection status of the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isConnected = await client.camera.isConnected()
      expect(isDataResult(isConnected)).toBe(true)
      if (!isDataResult(isConnected)) return
      expect(isConnected).toStrictEqual({ connected: true })
    })

    it('should be able to get the configuration of the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const configuration = await client.camera.getConfiguration()
      expect(isDataResult(configuration)).toBe(true)
      if (!isDataResult(configuration)) return
      expect(configuration).toStrictEqual({
        asymmetricBin: false,
        binX: 1,
        binY: 1,
        ccdXSize: 0,
        ccdYSize: 0,
        fastReadOut: false,
        fullWellCapacity: 0,
        gain: 0,
        maxExposure: 0,
        minExposure: 0,
        pixelSizeX: 0,
        pixelSizeY: 0
      })
    })
  })
})

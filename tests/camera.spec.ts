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

    it('should be able to get the status of the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.getStatus()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
      })
    })

    it('should be able to determine if the camera is ready', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isReady = await client.camera.isReady()
      expect(isDataResult(isReady)).toBe(true)
      if (!isDataResult(isReady)) return
      expect(isReady).toStrictEqual({
        complete: true,
        progress: 100,
        ready: true
      })
    })

    it('should be able to determine if the camera is fast readout capable', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isFastReadOut = await client.camera.getFastReadOutMode()
      expect(isDataResult(isFastReadOut)).toBe(true)
      if (!isDataResult(isFastReadOut)) return
      expect(isFastReadOut).toStrictEqual({
        fastReadOut: false
      })
    })

    it("should be able to turn the camera's cooler on", async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.turnCoolerOn()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        pulseGuiding: false,
        coolerOn: true,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
      })
    })

    it("should be able to turn the camera's cooler off", async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.turnCoolerOff()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
      })
    })

    it('should be able to initialize the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const init = await client.camera.initialise()
      expect(isDataResult(init)).toBe(true)
      if (!isDataResult(init)) return
      expect(init).toStrictEqual({ connected: true })
    })

    it('should be able to set the camera CCD temperature', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.setCCDTemperature({ temperature: -10 })
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: true,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: -10,
        heatSinkTemperature: 0,
        state: 'idle'
      })
    })
  })
})

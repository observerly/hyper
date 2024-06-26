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

    it('should be able to connect the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.connect()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({ connected: true })
    })

    it('should be able to disconnect the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.disconnect()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({ connected: false })
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

    it('should be able to shutdown the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.shutdown()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        connected: false,
        pulseGuiding: false,
        coolerOn: false,
        coolerPower: 0,
        CCDtemperature: 0,
        heatSinkTemperature: 0,
        state: 'idle'
      })
    })

    it('should be able to start an exposure on the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.startExposure({
        duration: 300,
        dark: false,
        flat: false,
        light: true
      })
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({
        duration: 300,
        dark: false,
        flat: false,
        light: true
      })
    })

    it('should be able to stop an exposure on the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.camera.stopExposure()
      expect(isDataResult(status)).toBe(true)
      if (!isDataResult(status)) return
      expect(status).toStrictEqual({})
    })

    it('should be able to store an exposure from the camera', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const store = await client.camera.storeExposure({
        bucketName: 'test.ex.observerly.com',
        duration: 130,
        start: '2021-05-15T03:00:00.000Z',
        filter: 'Hα',
        isDark: false,
        isFlat: false,
        mimetype: 'application/fits',
        target: 'M42',
        userId: 'sK0EFowNCXQ0JOK4UES2AjSnrVc2',
        uuid: '01H3WK0383PNKTT0240B53JX5N',
        mjd: 59379.0,
        equinox: 2021.5,
        ra: 83.82208,
        dec: -5.39111,
        telescope: 'Namibiascope 1',
        instrument: '20" AG Optical iDK Planewave L-500s',
        observer: 'Michael Roberts'
      })
      expect(isDataResult(store)).toBe(true)
      if (!isDataResult(store)) return
      expect(store).toStrictEqual({
        ccdXSize: 1463,
        ccdYSize: 1168,
        isDark: false,
        isFlat: false,
        locations: [
          'gs://test.ex.observerly.com/sK0EFowNCXQ0JOK4UES2AjSnrVc2/01H3WK0383PNKTT0240B53JX5N/M42_[Hα]_monochrome_M_130s_2021-05-15T03:00:00.000Z.fits'
        ],
        maxADU: 65535,
        mimetype: 'application/fits',
        sensor: 'Monochrome',
        userId: 'sK0EFowNCXQ0JOK4UES2AjSnrVc2',
        uuid: '01H3WK0383PNKTT0240B53JX5N'
      })
    })
  })
})

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

suite('@observerly/hyper NOX API Observing Exposure Client', () => {
  describe('exposureRoutes', () => {
    it('should be able to determine if the exposure is ready', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const isReady = await client.exposure.isReady()
      expect(isDataResult(isReady)).toBe(true)
      if (!isDataResult(isReady)) return
      expect(isReady).toStrictEqual({
        complete: true,
        progress: 100,
        ready: true
      })
    })

    it('should be able to start an exposure', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.exposure.start({
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

    it('should be able to stop an exposure', async () => {
      const client = setupClient(getURL('/api/v1/'))
      const status = await client.exposure.stop()
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

/*****************************************************************************************************************/

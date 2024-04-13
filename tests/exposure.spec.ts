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
  })
})

/*****************************************************************************************************************/

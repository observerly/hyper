/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

import { isDataResult } from '../src'

/*****************************************************************************************************************/

suite('@observerly/hyper Guards', () => {
  describe('isDataResult Type Guard', () => {
    it('should be a data result', () => {
      const result = { connected: true }
      expect(isDataResult(result)).toBe(true)
    })

    it('should not be a data result', () => {
      const result = { error: { message: 'An unknown error occured.' } }
      expect(isDataResult(result)).toBe(false)
    })
  })
})

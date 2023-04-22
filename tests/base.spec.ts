/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

/*****************************************************************************************************************/

import { fetch, getURL } from './setup'

/*****************************************************************************************************************/

suite('@observerly/hyper Base', () => {
  describe('Base Server', () => {
    it('should be setup correctly', async () => {
      const res = await fetch<{
        description: string
        endpoint: string
        name: string
        protocol: string
      }>(getURL('/api/v1'))

      expect(res).toBeDefined()

      expect(res).toHaveProperty('description')
      expect(res).toHaveProperty('endpoint')
      expect(res).toHaveProperty('name')
      expect(res).toHaveProperty('protocol')

      expect(res.description).toBeDefined()
      expect(res.endpoint).toBeDefined()
      expect(res.name).toBeDefined()
      expect(res.protocol).toBeDefined()
    })
  })
})

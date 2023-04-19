/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { beforeAll, afterAll } from 'vitest'

import { type Listener, listen } from 'listhen'

import { joinURL } from 'ufo'

import { toNodeListener } from 'h3'

import { ofetch } from 'ofetch'

import { server } from './utilities/server'

import { createHyperClient, routes } from '../src/index'

/*****************************************************************************************************************/

export const fetch = ofetch.create({ baseURL: 'http://localhost:3000/', responseType: 'json' })

/*****************************************************************************************************************/

// Provide a listener to ensure that the server is running.
let listener: Listener

/*****************************************************************************************************************/

// Add getURL as a global function.
export const getURL = (url: string) => joinURL(listener.url, url)

/*****************************************************************************************************************/

// Setup a client for testing.
export const setupClient = (url: string) => {
  return createHyperClient(routes, {
    base: new URL(url),
    headers: async () => {
      return new Headers({
        'X-API-Key': `Key <<API_KEY>>`
      })
    }
  })
}

/*****************************************************************************************************************/

// Establish API mocking before all tests.
beforeAll(async () => {
  if (listener) return

  listener = await listen(toNodeListener(server), {
    port: 3036
  })
})

/*****************************************************************************************************************/

// Clean up after the tests are finished.
afterAll(async () => {
  if (!listener) return

  await listener.close()
})

/*****************************************************************************************************************/

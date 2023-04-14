/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { beforeAll, afterEach, afterAll } from 'vitest'

import { type Listener, listen } from 'listhen'

import { joinURL } from 'ufo'

import { toNodeListener } from 'h3'

import { ofetch } from 'ofetch'

import { server } from './utilities/server'

/*****************************************************************************************************************/

export const fetch = ofetch.create({ baseURL: 'http://localhost:3000/', responseType: 'json' })

/*****************************************************************************************************************/

// Add getURL as a global function.
export const getURL = (url: string) => joinURL(listener.url, url)

/*****************************************************************************************************************/

// Provide a listener to ensure that the server is running.
let listener: Listener

/*****************************************************************************************************************/

// Establish API mocking before all tests.
beforeAll(async () => {
  listener = await listen(toNodeListener(server))
})

/*****************************************************************************************************************/

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(async () => {
  await listener.close()
})

/*****************************************************************************************************************/

// Clean up after the tests are finished.
afterAll(async () => {
  await listener.close()
})

/*****************************************************************************************************************/

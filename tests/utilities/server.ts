/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { createApp } from 'h3'

import { handlers } from '../mocks/handlers'

/*****************************************************************************************************************/

// Create a base h3 server instance:
export const server = createApp()

// Setup the request handlers:
handlers.every(handler => {
  server.use(handler.url, handler.handler)
})

/*****************************************************************************************************************/

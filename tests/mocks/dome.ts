/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const domeHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/dome/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/slewing',
    handler: eventHandler(_event => {
      return {
        slewing: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/coordinates',
    handler: eventHandler(_event => {
      return {
        alt: 34.5619912,
        az: 56.1234567
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/dome/status',
    handler: eventHandler(_event => {
      return {
        connected: true,
        slewing: true,
        slaved: true,
        parked: true,
        home: true,
        shutter: 'open'
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/init',
    handler: eventHandler(event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      return {
        connected: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/connect',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ connect: boolean }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        connected: body.connect
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/shutter',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ open?: boolean; close?: boolean }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        status: body.open ? 'open' : 'closed'
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/dome/couple',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ couple: boolean; uncouple: boolean }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        coupled: body.couple,
        uncouple: body.uncouple
      }
    })
  },
  {
    method: 'DELETE',
    url: '/api/v1/dome/shutdown',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'DELETE') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      return {
        connected: false,
        slewing: false,
        slaved: false,
        parked: true,
        home: true,
        shutter: 'Closed'
      }
    })
  }
]

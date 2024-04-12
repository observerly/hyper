/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, getMethod, readBody } from 'h3'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const telescopeHandlers: Handler[] = [
  {
    method: 'GET',
    url: '/api/v1/telescope/connected',
    handler: eventHandler(_event => {
      return {
        connected: true
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/slewing',
    handler: eventHandler(_event => {
      return {
        slewing: false
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/tracking',
    handler: eventHandler(_event => {
      return {
        tracking: false
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/config',
    handler: eventHandler(_event => {
      return {
        apertureArea: 0.0269,
        apertureDiameter: 0.0269,
        focalLength: 1.26
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/coordinates',
    handler: eventHandler(_event => {
      return {
        ra: 34.5619912,
        dec: 56.1234567,
        alt: 34.5619912,
        az: 56.1234567
      }
    })
  },
  {
    method: 'GET',
    url: '/api/v1/telescope/status',
    handler: eventHandler(_event => {
      const utc = new Date('2021-05-14T00:00:00.000+00:00').toISOString()

      return {
        connected: true,
        slewing: false,
        tracking: false,
        parked: false,
        home: false,
        utc
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/telescope/init',
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
    method: 'DELETE',
    url: '/api/v1/telescope/shutdown',
    handler: eventHandler(event => {
      const method = getMethod(event)

      if (method !== 'DELETE') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const utc = new Date('2021-05-14T00:00:00.000+00:00').toISOString()

      return {
        connected: false,
        slewing: false,
        tracking: false,
        parked: true,
        home: false,
        utc
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/telescope/connect',
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
    url: '/api/v1/telescope/slew/equatorial',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ ra: number; dec: number }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      if (body.ra > 360 || body.ra < 0) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      if (body.dec > 90 || body.dec < -90) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        slewing: true
      }
    })
  },
  {
    method: 'PUT',
    url: '/api/v1/telescope/slew/horizontal',
    handler: eventHandler(async event => {
      const method = getMethod(event)

      if (method !== 'PUT') {
        return new Response('Method Not Allowed', {
          status: 405,
          statusText: 'Method Not Allowed'
        })
      }

      const body = await readBody<{ az: number; alt: number }>(event)

      if (!body) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      if (body.az > 360 || body.az < 0) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      if (body.alt > 90 || body.alt < -90) {
        return new Response('Bad Request', {
          status: 400,
          statusText: 'Bad Request'
        })
      }

      return {
        slewing: true
      }
    })
  }
]

/*****************************************************************************************************************/

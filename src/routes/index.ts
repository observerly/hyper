/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { rotator } from './rotator'
import { telescope } from './telescope'

/*****************************************************************************************************************/

export const routes = (
  base: URL = new URL('http://localhost:3000/api/v1'),
  init?: RequestInit,
  headers?: () => Headers | Promise<Headers>
) => ({
  rotator: rotator(base, init, headers),
  telescope: telescope(base, init, headers)
})

/*****************************************************************************************************************/

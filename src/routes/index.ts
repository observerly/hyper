/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { filterwheel } from './filterwheel'
import { focuser } from './focuser'
import { rotator } from './rotator'
import { telescope } from './telescope'

/*****************************************************************************************************************/

export const routes = (
  base: URL = new URL('http://localhost:3000/api/v1'),
  init?: RequestInit,
  headers?: () => Headers | Promise<Headers>
) => ({
  filterwheel: filterwheel(base, init, headers),
  focuser: focuser(base, init, headers),
  rotator: rotator(base, init, headers),
  telescope: telescope(base, init, headers)
})

/*****************************************************************************************************************/

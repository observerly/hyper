/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { conditions } from './conditions'
import { dome } from './dome'
import { filterwheel } from './filterwheel'
import { focuser } from './focuser'
import { monitor } from './monitor'
import { rotator } from './rotator'
import { telescope } from './telescope'

/*****************************************************************************************************************/

export const routes = (
  base: URL = new URL('http://localhost:3000/api/v1'),
  init?: RequestInit,
  headers?: () => Headers | Promise<Headers>
) => ({
  conditions: conditions(base, init, headers),
  dome: dome(base, init, headers),
  filterwheel: filterwheel(base, init, headers),
  focuser: focuser(base, init, headers),
  monitor: monitor(base, init, headers),
  rotator: rotator(base, init, headers),
  telescope: telescope(base, init, headers)
})

/*****************************************************************************************************************/

/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { baseHandlers } from './base'

import { cameraHandlers } from './camera'
import { domeHandlers } from './dome'
import { exposureHandlers } from './exposure'
import { filterwheelHandlers } from './filterwheel'
import { focuserHandlers } from './focuser'
import { monitorHandlers } from './monitor'
import { rotatorHandlers } from './rotator'
import { telescopeHandlers } from './telescope'

import { type Handler } from '../shared/handler'
import { conditionsHandlers } from './conditions'

/*****************************************************************************************************************/

export const handlers: Handler[] = [
  ...baseHandlers,
  ...cameraHandlers,
  ...conditionsHandlers,
  ...domeHandlers,
  ...exposureHandlers,
  ...filterwheelHandlers,
  ...focuserHandlers,
  ...monitorHandlers,
  ...rotatorHandlers,
  ...telescopeHandlers
]

/*****************************************************************************************************************/

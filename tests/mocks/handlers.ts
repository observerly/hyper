/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { baseHandlers } from './base'

import { domeHandlers } from './dome'
import { filterwheelHandlers } from './filterwheel'
import { focuserHandlers } from './focuser'
import { monitorHandlers } from './monitor'
import { rotatorHandlers } from './rotator'
import { telescopeHandlers } from './telescope'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const handlers: Handler[] = [
  ...baseHandlers,
  ...domeHandlers,
  ...filterwheelHandlers,
  ...focuserHandlers,
  ...monitorHandlers,
  ...rotatorHandlers,
  ...telescopeHandlers
]

/*****************************************************************************************************************/

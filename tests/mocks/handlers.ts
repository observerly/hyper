/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { baseHandlers } from './base'

import { focuserHandlers } from './focuser'
import { rotatorHandlers } from './rotator'
import { telescopeHandlers } from './telescope'

import { type Handler } from '../shared/handler'
import { filterwheelHandlers } from './filterwheel'

/*****************************************************************************************************************/

export const handlers: Handler[] = [
  ...baseHandlers,
  ...filterwheelHandlers,
  ...focuserHandlers,
  ...rotatorHandlers,
  ...telescopeHandlers
]

/*****************************************************************************************************************/

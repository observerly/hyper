/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { baseHandlers } from './base'

import { rotatorHandlers } from './rotator'
import { telescopeHandlers } from './telescope'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const handlers: Handler[] = [...baseHandlers, ...rotatorHandlers, ...telescopeHandlers]

/*****************************************************************************************************************/

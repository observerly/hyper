/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

export type HandlerAction<T> = (body?: any) => Promise<T> | HandlerError

/*****************************************************************************************************************/

export interface HandlerError {
  error: string
}

/*****************************************************************************************************************/

export interface Handler<T> {
  /**
   *
   * The name of the handler
   *
   */
  name: string
  /**
   *
   * The action to be performed by the handler
   *
   */
  action: HandlerAction<T>
}

/*****************************************************************************************************************/

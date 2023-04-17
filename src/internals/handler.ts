/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/hyper
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

export type HandlerAction<T> = () => Promise<T>

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

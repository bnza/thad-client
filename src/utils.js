import { when, is, pipe, toLower, replace, toUpper } from 'ramda'

export const capitalize = when(
  is(String),
  pipe(toLower, replace(/^./, toUpper()))
)

export const hasOwnProperty = (object, key) =>
  object &&
  typeof object === 'object' &&
  Object.prototype.hasOwnProperty.call(object, key)

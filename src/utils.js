import { when, is, pipe, toLower, replace, toUpper } from 'ramda'

export const capitalize = when(
  is(String),
  pipe(toLower, replace(/^./, toUpper()))
)

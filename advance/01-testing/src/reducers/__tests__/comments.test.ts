import commentsReducer from '../comments'

import { SAVE_COMMENT } from '../../actions/types'

it('handles actions of type SAVE_COMMENT', () => {
  const action = {
    payload: 'New Comment',
    type: SAVE_COMMENT,
  }

  const newState = commentsReducer([], action)

  expect(newState).toEqual(['New Comment'])
})

it('handles action with unknown type', () => {
  const newState = commentsReducer([], { type: 'WHAT_EIEI' })

  expect(newState).toEqual([])
})
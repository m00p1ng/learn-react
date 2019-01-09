import { combineReducers } from 'redux'
import { SET_STACK, LOAD_STACKS, ADD_STACK } from '../actions'

const stack = (state = {}, action) => {
  switch (action.type) {
    case SET_STACK:
      return action.stack;
    default:
      return state
  }
}

const stacks = (state = [], action) => {
  switch (action.type) {
    case LOAD_STACKS:
      return action.stacks
    case ADD_STACK:
      return [
        ...state,
        {
          ...action.stack,
          id: state.length
        },
      ]
    default:
      return state
  }
}

export default combineReducers({
  stack,
  stacks,
})
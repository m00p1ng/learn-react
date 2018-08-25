import { combineReducers } from 'redux'

import authReduder from './auth'
import commentsReducer from './comments'

export default combineReducers({
  auth: authReduder,
  comments: commentsReducer,
})
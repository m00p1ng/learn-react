import { all } from 'redux-saga/effects'

import { commentSaga } from './comments'

export default function* rootSaga() {
  yield all([
    ...commentSaga,
  ])
}
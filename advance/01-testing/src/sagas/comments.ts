import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import {
  FETCH_COMMENTS_REQUEST,
} from '../actions/types'

import {
  fetchCommentsSuccess,
} from '../actions'

const ROOT_URL = 'http://jsonplaceholder.typicode.com/comments'

export function* fetchAllCommentsAsync() {
  try {
    const data = yield call(() => axios.get(ROOT_URL).then(res => res.data))
    yield put(fetchCommentsSuccess(data))
  } catch (error) {
    // do nothing
  }
}

export const commentSaga = [
  takeEvery(FETCH_COMMENTS_REQUEST, fetchAllCommentsAsync),
]
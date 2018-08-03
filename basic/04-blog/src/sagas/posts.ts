import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  CREATE_POST_REQUESTED, 
  FETCH_ALL_POSTS_REQUESTED,
  FETCH_POST_REQUESTED,
} from '../actions';
import {
  createPostError,
  createPostSuccess,
  fetchAllPostsError,
  fetchAllPostsSuccess,
  fetchPostByIdFailed,
  fetchPostByIdSuccess,
} from '../actions/posts';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';
const API_KEY = '?key=MOOPING555EIEI';

export function* fetchAllPostsAsync() {
  try {
    const url = `${ROOT_URL}/posts${API_KEY}`;
    const data = yield call(() => axios.get(url).then(res => res.data));
    yield put(fetchAllPostsSuccess(data));
  } catch(error) {
    yield put(fetchAllPostsError(error));
  }
}

export function* createPostAsync(action: any) {
  try {
    const url = `${ROOT_URL}/posts${API_KEY}`;
    const data = yield call(() => axios.post(url, action.payload.data).then(res => res.data));
    yield put(createPostSuccess(data, action.payload.callback));
  } catch(error) {
    yield put(createPostError(error));
  }
}

export function* fetchPostByIdAsync(action: any) {
  try {
    const url = `${ROOT_URL}/posts/${action.payload.id}${API_KEY}`;
    const data = yield call(() => axios.get(url).then(res => res.data));
    yield put(fetchPostByIdSuccess(data));
  } catch(error) {
    yield put(fetchPostByIdFailed(error));
  }
}

export const postSaga = [
  takeEvery(FETCH_ALL_POSTS_REQUESTED, fetchAllPostsAsync),
  takeEvery(CREATE_POST_REQUESTED, createPostAsync),
  takeEvery(FETCH_POST_REQUESTED, fetchPostByIdAsync),
];
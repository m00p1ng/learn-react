import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  signinError,
  signinSuccess,
  signoutSuccess,
  signupError,
  signupSuccess,
} from '../actions'
import {
  SIGNIN_REQUEST,
  SIGNOUT_REQUEST,
  SIGNUP_REQUEST,
} from '../actions/types'

const ROOT_URL = 'http://localhost:3090'

export function* signupAsync(action: any) {
  try {
    const url = `${ROOT_URL}/signup`
    const data = yield call(() => axios.post(url, action.payload.data).then(res => res.data))
    yield put(signupSuccess(data))
    localStorage.setItem('token', data.token)
    action.payload.callback()
  } catch (err) {
    yield put(signupError(err.response.data.error))
  }
}

export function* signinAsync(action: any) {
  try {
    const url = `${ROOT_URL}/signin`
    const data = yield call(() => axios.post(url, action.payload.data).then(res => res.data))
    yield put(signinSuccess(data))
    localStorage.setItem('token', data.token)
    action.payload.callback()
  } catch (err) {
    yield put(signinError(err.response.data.error))
  }
}

export function* signout() {
  yield put(signoutSuccess())

  localStorage.removeItem('token')
}

export const auth = [
  takeEvery(SIGNIN_REQUEST, signinAsync),
  takeEvery(SIGNUP_REQUEST, signupAsync),
  takeEvery(SIGNOUT_REQUEST, signout),
]
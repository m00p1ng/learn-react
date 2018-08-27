import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,

  SIGNOUT_SUCCESS,

  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../actions/types'

const UPITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
}

export default function (state = UPITIAL_STATE, action: any) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, authenticated: action.payload }
    case SIGNUP_FAILED:
      return { ...state, errorMessage: action.payload }
    case SIGNIN_SUCCESS:
      return { ...state, authenticated: action.payload }
    case SIGNIN_FAILED:
      return { ...state, errorMessage: action.payload }
    case SIGNOUT_SUCCESS:
      return { ...state, authenticated: '' }
    default:
      return state
  }
}
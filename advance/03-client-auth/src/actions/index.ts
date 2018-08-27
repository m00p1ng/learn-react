import {
  SIGNIN_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,

  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,

  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from './types'


export const signup = (formProps: any, callback: any) => {
  return {
    payload: {
      callback,
      data: formProps,
    },
    type: SIGNUP_REQUEST,
  }
}

export const signupSuccess = (data: any) => {
  return {
    payload: data,
    type: SIGNUP_SUCCESS,
  }
}

export const signupError = (err: any) => {
  return {
    payload: err,
    type: SIGNUP_FAILED,
  }
}

export const signin = (formProps: any, callback: any) => {
  return {
    payload: {
      callback,
      data: formProps,
    },
    type: SIGNIN_REQUEST,
  }
}

export const signinSuccess = (data: any) => {
  return {
    payload: data,
    type: SIGNIN_SUCCESS,
  }
}

export const signinError = (err: any) => {
  return {
    payload: err,
    type: SIGNIN_FAILED,
  }
}

export const signout = () => {
  return {
    type: SIGNOUT_REQUEST,
  }
}

export const signoutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  }
}
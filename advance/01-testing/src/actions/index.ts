import {
  CHANGE_AUTH,

  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,

  SAVE_COMMENT,
} from './types'

export function saveComment(comment: string) {
  return {
    payload: comment,
    type: SAVE_COMMENT,
  }
}

export function fetchComments() {
  return {
    type: FETCH_COMMENTS_REQUEST,
  }
}

export function fetchCommentsSuccess(data: any) {
  return {
    payload: data,
    type: FETCH_COMMENTS_SUCCESS,
  }
}

export function changeAuth(isLoggedin: boolean) {
  return {
    payload: isLoggedin,
    type: CHANGE_AUTH,
  }
}
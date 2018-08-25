import {
  FETCH_COMMENTS_SUCCESS,
  SAVE_COMMENT,
} from '../actions/types'

export default function (state: string[] = [], action: any) {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload]
    case FETCH_COMMENTS_SUCCESS:
      const comments = action.payload.map((comment: any) => comment.name)
      return [...state, ...comments]
    default:
      return state
  }
}
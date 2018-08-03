import * as _ from 'lodash';
import { 
  FETCH_ALL_POSTS_FAILED,
  FETCH_ALL_POSTS_REQUESTED,
  FETCH_ALL_POSTS_SUCCEEDED,

  FETCH_POST_FAILED,
  FETCH_POST_REQUESTED,
  FETCH_POST_SUCCEEDED,
} from '../actions';

const initalState = {
  data: [],
  error: {
    errorMsg: '',
    status: false,
  },
  loading: false,
};

export default function(state = initalState, action: any) {
  switch(action.type) {
    case FETCH_ALL_POSTS_REQUESTED:
      return {
        ...state,
        error: {
          status: false,
        },
        loading: true,
      };
    case FETCH_ALL_POSTS_SUCCEEDED:
      return {
        data: _.mapKeys(action.payload.data, 'id'),
        error: {
          status: false,
        },
        loading: false,
      };
    case FETCH_ALL_POSTS_FAILED:
      return {
        ...state,
        error: {
          errorMsg: action.payload.error,
          status: true,
        },
        loading: false,
      };
    case FETCH_POST_REQUESTED:
      return {
        ...state,
        error: {
          status: false,
        },
        loading: true,
      };
    case FETCH_POST_SUCCEEDED:
      return {
        ...state,
        [action.payload.data.id] : action.payload.data,
        error: {
          status: false,
        },
        loading: false,
      };
    case FETCH_POST_FAILED:
      return {
        ...state,
        error: {
          status: true,
        },
        loading: false,
      };
    default:
      return state;
  }
}
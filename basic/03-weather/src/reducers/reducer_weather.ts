import {
  REQUESTED_WEATHER,
  REQUESTED_WEATHER_FAILED,
  REQUESTED_WEATHER_SUCCESSED,
} from "../actions";

const initialState = {
  data: [],
  error: false,
  loading: false,
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case REQUESTED_WEATHER:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case REQUESTED_WEATHER_SUCCESSED:
      return {
        data: [action.data, ...state.data],
        error: false,
        loading: false,
      };
    case REQUESTED_WEATHER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}
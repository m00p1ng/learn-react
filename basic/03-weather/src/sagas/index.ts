import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_WEATHER } from "../actions";

// @ts-ignore
import { requestWeather, requestWeatherError, requestWeatherSucess } from '../actions/weather';

const { API_KEY } = process.env;
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function* watchFetchWeather(): any {
  yield takeEvery(FETCH_WEATHER, fetchWeatherAsync);
}

export function* fetchWeatherAsync(state: any) {
  yield put(requestWeather());
  try {
    const url = `${ROOT_URL}&q=${state.term},us`;
    const data = yield call(() => {
      return axios.get(url).then((res) => (res.data));
    });

    yield put(requestWeatherSucess(data));
  } catch(error) {
    yield put(requestWeatherError());
  }
}
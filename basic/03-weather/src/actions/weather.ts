import {
  FETCH_WEATHER,
  REQUESTED_WEATHER,
  REQUESTED_WEATHER_FAILED,
  REQUESTED_WEATHER_SUCCESSED,
} from "./index";

export const requestWeather = () => {
  return { type: REQUESTED_WEATHER};
};

export const requestWeatherSucess = (data: any[]) => {
  return { type: REQUESTED_WEATHER_SUCCESSED, data };
};

export const requestWeatherError = () => {
  return { type: REQUESTED_WEATHER_FAILED };
};

export const fetchWeather = (term: string) => {
  return { type: FETCH_WEATHER, term };
};
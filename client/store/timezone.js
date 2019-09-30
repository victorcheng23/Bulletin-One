import axios from "axios";
const { IPGeolocationAPIKey } = require("../../secrets");
const { OpenWeatherAPIKey } = require("../../secrets");
const openWeatherAPI = "https://api.openweathermap.org/data/2.5/";
const IPGeolocationAPI = "https://api.ipgeolocation.io/timezone?apiKey=";

//ACTION TYPES
const GET_TIMEZONE = "GET_TIMEZONE";

//INITIAL STATE
const timezone = {};

//ACTION CREATORS
const getTimezone = timezone => ({ type: GET_TIMEZONE, timezone });

//THUNK CREATORS
export const getTimezoneThunk = city => {
  return async dispatch => {
    try {
      const { data: weather } = await axios.get(
        `${openWeatherAPI}weather?q=${city}&APPID=${OpenWeatherAPIKey}`
      );
      const { data: tz } = await axios.get(
        `${IPGeolocationAPI}${IPGeolocationAPIKey}&lat=${weather.coord.lat}&long=${weather.coord.lon}`
      );
      dispatch(getTimezone(tz));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER
export default function(state = timezone, action) {
  switch (action.type) {
    case GET_TIMEZONE:
      return action.timezone;
    default:
      return state;
  }
}

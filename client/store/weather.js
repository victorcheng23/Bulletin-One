import axios from "axios";
const APIKey = require("../../secrets");
const openWeatherAPI = "https://api.openweathermap.org/data/2.5/";

//ACTION TYPES
const GET_WEATHER = "GET_WEATHER";

//INITIAL STATE
const weather = {};

//ACTION CREATORS
const getWeather = weather => ({ type: GET_WEATHER, weather });

//THUNK CREATORS
export const getWeatherThunk = (city, country) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${openWeatherAPI}weather?q=${city},${country}&APPID=${APIKey}`
      );
      dispatch(getWeather(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER
export default function(state = weather, action) {
  switch (action.type) {
    case GET_WEATHER:
      return action.weather;
    default:
      return state;
  }
}

import axios from "axios";
const { IPGeolocationAPIKey } = require("../../secrets");
const IPGeolocationAPI = "https://api.ipgeolocation.io/timezone?apiKey=";

//ACTION TYPES
const GET_TIMEZONE = "GET_TIMEZONE";

//INITIAL STATE
const timezone = {};

//ACTION CREATORS
const getTimezone = timezone => ({ type: GET_TIMEZONE, timezone });

//THUNK CREATORS
export const getTimezoneThunk = (lat, long) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${IPGeolocationAPI}${IPGeolocationAPIKey}&lat=${lat}&long=${long}`
      );
      dispatch(getTimezone(data));
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

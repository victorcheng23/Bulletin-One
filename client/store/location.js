import axios from "axios";
const { IPGeolocationAPIKey } = require("../../secrets");
const IPGeolocationAPI = "https://api.ipgeolocation.io/ipgeo?apiKey=";

//ACTION TYPES
const GET_LOCATION = "GET_LOCATION";
const SET_CITY = "SET_CITY";

//INITIAL STATE
const location = {};

//ACTION CREATORS
const getLocationActionCreator = location => ({ type: GET_LOCATION, location });
export const setCityActionCreator = city => ({ type: SET_CITY, city });

//THUNK CREATORS
export const getLocationThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${IPGeolocationAPI}${IPGeolocationAPIKey}`
      );
      dispatch(getLocation(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER
export default function(state = location, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.location;
    case SET_CITY:
      return { city: action.city };
    default:
      return state;
  }
}

import { ADD_CITY, REMOVE_CITY, SET_WEATHER, SET_CITIES } from './types';

/**
 * The initial state for the Redux store.
 */
const initialState = {
  cities: [],
  weather: {},
};

/**
 * The reducer function for managing state changes in the Redux store.
 *
 * @param {object} state - The current state.
 * @param {object} action - The dispatched action.
 * @returns {object} The new state.
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case REMOVE_CITY:
      return {
        ...state,
        cities: state.cities.filter((city) => city !== action.payload),
      };
    case SET_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          [action.payload.city]: action.payload.weather,
        },
      };
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

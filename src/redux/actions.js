// Redux Actions
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const SET_WEATHER = 'SET_WEATHER';
export const SET_CITIES = 'SET_CITIES';

/**
 * Action creator to add a city to the list of cities.
 *
 * @param {string} city - The city name to add.
 * @returns {object} An action object with type and payload.
 */
export const addCity = (city) => ({
  type: ADD_CITY,
  payload: city,
});

/**
 * Action creator to remove a city from the list of cities.
 *
 * @param {string} city - The city name to remove.
 * @returns {object} An action object with type and payload.
 */
export const removeCity = (city) => ({
  type: REMOVE_CITY,
  payload: city,
});

/**
 * Action creator to set the weather data for a city.
 *
 * @param {string} city - The city name.
 * @param {object} weatherData - The weather data for the city.
 * @returns {object} An action object with type and payload.
 */
export const setWeather = (city, weatherData) => ({
  type: SET_WEATHER,
  payload: {
    city,
    weather: weatherData,
  },
});

/**
 * Action creator to set the list of cities.
 *
 * @param {string[]} cities - The list of cities.
 * @returns {object} An action object with type and payload.
 */
export const setCities = (cities) => ({
  type: SET_CITIES,
  payload: cities,
});

/**
 * Selects the latest city from the state.
 *
 * @param {object} state - The Redux state.
 * @returns {string} The latest city name.
 */
export const getLatestCity = (state) => state.cities[state.cities.length - 1];

/**
 * Selects the latest weather data from the state.
 *
 * @param {object} state - The Redux state.
 * @returns {object} The latest weather data.
 */
export const getLatestWeather = (state) => state.weather[getLatestCity(state)];

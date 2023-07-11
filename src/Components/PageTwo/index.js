import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import cityList from './city.list.json';
import axios from 'axios';
import { MdArrowBackIos } from 'react-icons/md';
import { addCity, setWeather } from '../../redux/actions';
import './style.css';

/**
 * The PageTwo component represents the second page of the application.
 * It allows the user to search for a city and add it to the list of cities.
 * The selected city's weather data is fetched and stored in the Redux store.
 */
const PageTwo = () => {
  const [inputText, setInputText] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the input change event and updates the input text state.
   * @param {Object} event - The input change event object
   */
  const inputHandler = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
  };

  /**
   * Fetches the cities matching the input text and updates the filtered cities state.
   */
  const fetchCities = () => {
    setLoading(true);
    const filteredCities = cityList
      .filter((city) => city.name.toLowerCase().includes(inputText.toLowerCase()))
      .map((city) => ({ label: city.name, key: city.id }))
      .slice(0, 8);
    setFilteredCities(filteredCities);
    setLoading(false);
  };

  useEffect(() => {
    if (inputText.length > 0) {
      fetchCities();
    } else {
      setFilteredCities([]);
    }
  }, [inputText]);

  /**
   * Handles the city selection change event and updates the selected city state.
   * @param {Object} value - The selected city object
   */
  const handleSelectChange = (value) => {
    setSelectedCity(value);
  };

  /**
   * Handles the form submit event and fetches the weather data for the selected city.
   * It dispatches actions to add the city to the list and set the weather data in the Redux store.
   * @param {Object} event - The form submit event object
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedCity) {
      try {
        setLoading(true);
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: selectedCity.label,
            appid: '6d1a344a8638851e95b76a037afe397e',
          },
        });
        const weatherData = response.data;
        dispatch(addCity(selectedCity.label));
        dispatch(setWeather(selectedCity.label, weatherData));
        setLoading(false);
        navigate('/'); // Redirect to the root path (PageOne)
      } catch (error) {
        console.log('Error fetching weather data:', error);
        setLoading(false);
      }
    }
  };

  /**
   * Handles the navigation back to the previous page.
   */
  const handleNavigation = () => {
    navigate('/');
  };

  return (
    <div className="card" id="PageTwo">
      <Link to="/" onClick={handleNavigation}>
        <MdArrowBackIos className="back_icon" />
      </Link>
      <div className="search">
        <form onSubmit={handleFormSubmit}>
          <Autocomplete
            className="autocomplete"
            id="outlined-basic"
            options={filteredCities}
            getOptionLabel={(option) => option.label}
            value={selectedCity}
            loading={loading}
            onChange={(event, value) => handleSelectChange(value)}
            renderInput={(params) => (
              <TextField
                className="autocomplete"
                {...params}
                onChange={inputHandler}
                value={inputText}
                variant="outlined"
                fullWidth
                label="Search"
              />
            )}
          />
          {selectedCity && <button className="btn_save" type="submit">Save</button>}
        </form>
      </div>
    </div>
  );
};

export default PageTwo;

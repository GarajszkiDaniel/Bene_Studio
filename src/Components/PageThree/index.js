import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { RiSunLine, RiSunFill } from 'react-icons/ri';
import moment from 'moment';
import { getLatestWeather } from '../../redux/actions';
import './style.css';

/**
 * The PageThree component represents the third page of the application.
 * It displays detailed weather information for the latest city.
 */
const PageThree = () => {
  const latestWeather = useSelector(getLatestWeather);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [cityTime, setCityTime] = useState('');
  const [formattedSunrise, setFormattedSunrise] = useState('');
  const [formattedSunset, setFormattedSunset] = useState('');

  const handleNavigation = () => {
    window.history.back(); // Navigates back to the previous page
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (latestWeather) {
      const { timezone, sys } = latestWeather;
      const { sunrise, sunset } = sys;

      const sunriseTime = moment.unix(sunrise).utcOffset(timezone / 60);
      const formattedSunrise = sunriseTime.format('HH:mm');
      setFormattedSunrise(formattedSunrise);

      const sunsetTime = moment.unix(sunset).utcOffset(timezone / 60);
      const formattedSunset = sunsetTime.format('HH:mm');
      setFormattedSunset(formattedSunset);

      const cityMoment = moment().utcOffset(timezone / 60);
      const formattedCityTime = cityMoment.format('HH:mm');
      setCityTime(formattedCityTime);
    }
  }, [latestWeather]);

  if (!latestWeather) {
    return null;
  }

  const { name, weather, main } = latestWeather;
  const { temp } = main;
  const { icon } = weather[0];

  const celsiusTemp = Math.round(temp - 273.15);

  return (
    <div className="card_weather" id="PageThree">
      <Link to="/" onClick={handleNavigation}>
        <MdArrowBackIos className="back_icon" />
      </Link>
      <div className='center'>
        <h1>{name}</h1>
        <h1>{cityTime && <div>{cityTime}</div>}</h1>
        <div>
          <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" />
        </div>
        <div className="temperature">{celsiusTemp}°C</div>
        <div className="sunrise-sunset">
          <RiSunFill className="weather-icon_svg" /> {formattedSunrise}
        </div>
        <div className="sunrise-sunset">
          <RiSunLine className="weather-icon_svg" /> {formattedSunset}
        </div>
      </div>
    </div>
  );
};

export default PageThree;

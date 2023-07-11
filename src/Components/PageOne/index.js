import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLatestCity } from '../../redux/actions';
import { ImPlus } from 'react-icons/im';
import './style.css';

/**
 * The PageOne component represents the first page of the application.
 * It displays the latest city and provides navigation to other pages.
 */
const PageOne = () => {
  const latestCity = useSelector(getLatestCity);

  return (
    <div className="card" id="PageOne">
      <div className='city'>
        <Link to="/page-three" className='city_name'>
          {latestCity}
        </Link>
      </div>
      <Link to="/page-two">
        <ImPlus className='add_icon' />
      </Link>
    </div>
  );
};

export default PageOne;

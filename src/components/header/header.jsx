import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import moment from 'moment';
import gradient from 'random-gradient';
import {useSignOutMutation} from 'services/auth-service';
import {useGetLocationQuery, useGetWeatherQuery} from 'services/third-party';

import {stringToColor} from 'helpers';

import {useSearch} from 'components/search-context';
import {usePermissions} from 'components/permissions-context';
import Input from 'components/input';
import IconButton from 'components/icon-button';

import {ReactComponent as SignOut} from 'assets/icons/sign-out.svg';
import {ReactComponent as Users} from 'assets/icons/users.svg';

import './styles.scss';

const Header = ({showLoaderBasedOnValues, user}) => {
  const {search, setSearch} = useSearch();
  const navigate = useNavigate();
  const {permissions} = usePermissions();
  const [signOut, {isLoading: signOutLoading}] = useSignOutMutation();
  const [position, setPosition] = useState(null);
  const [currentCity, setCurrentCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userAbbr = `${Array.from(user.firstName)[0]}${Array.from(user.lastName)[0]}`;

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        setIsLoading(false);
      }, () => {
        console.error('Unable to receive your current position');

        setIsLoading(false);
      });
    } else {
      console.log('Geolocation not supported');

      setIsLoading(false);
    }
  }, []);

  const {data: location, isLoading: getLocationLoading} = useGetLocationQuery(position, {skip: !position});
  const {data: weather, isLoading: getWeatherLoading} = useGetWeatherQuery({position, appId: process.env.REACT_APP_WEATHER_API_KEY}, {skip: !position});

  useEffect(() => {
    if (location) {
      setCurrentCity(location.address.city || location.address.town || location.address.village);
    }
  }, [location]);

  useEffect(() => {
    if (weather) {
      setCurrentWeather(weather);
    }
  }, [weather]);

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues([signOutLoading, isLoading, getLocationLoading, getWeatherLoading]);
    }
  }, [signOutLoading, isLoading, getLocationLoading, getWeatherLoading]);

  const handleSignOut = async() => {
    try {
      const signOutRequest = await signOut();

      if (signOutRequest.error) {
        await toast.error(signOutRequest.error.data.message, {autoClose: 2000});

        throw signOutRequest.error.data;
      }

      await toast.success(signOutRequest.data.message, {autoClose: 1000});
      navigate('/sign-in');
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSearch = ({target}) => setSearch(target.value);

  return (
    <header className='app-header'>
      <div className='header-content-container'>
        <div className='date-weather-container'>
          <div className='weather-container'>
            {isLoading || getWeatherLoading || getLocationLoading || !currentWeather ? 'Please wait...' : (
              <>
                <div className='date-container'>
                  <p className='date'>{moment().format('DD')}</p>
                  <p className='month'>{moment().format('MMM')}</p>
                </div>
                <img className='weather-icon' src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`} alt='weather-icon'/>
                <div className='weather-descripton'>
                  <h3 className='weather-city'>{currentCity}</h3>
                  <p className='weather-condition'>{currentWeather?.weather[0].main}</p>
                  <p className='weather-wind'>wind speed: {currentWeather?.wind.speed}</p>
                </div>
                <p className='weather-temperature'>{Math.floor(currentWeather?.main.temp)}°</p>
              </>
            )}
          </div>
        </div>
        <Input
          background='glass'
          placeholder='Search'
          value={search}
          handleInput={handleSearch}
          error=''
        />
        <div className='user-info-container'>
          {permissions.includes('SHOW_ALL_USERS') && (
            <IconButton
              icon={Users}
              tooltipText='Users'
              link='/users'
            />
          )}
          <div className='user-avatar-container'>
            <div
              className='user-avatar-colored-border'
              style={{background: `${gradient(`${user.firstName} ${user.lastName}`)} border-box`}}
            >
            </div>
            <div
              className='user-avatar'
              style={{backgroundColor: stringToColor(userAbbr)}}
            >
              {userAbbr}
              {user.avatar && <img src={user.avatar} alt='user-avatar'/>}
            </div>
          </div>
          <div className='user-info'>
            <p className='user-name'>
              <Link to={`/users/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
            </p>
            <p className='user-email'>{user.email}</p>
          </div>
          <IconButton
            icon={SignOut}
            tooltipText='Sign Out'
            onClick={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
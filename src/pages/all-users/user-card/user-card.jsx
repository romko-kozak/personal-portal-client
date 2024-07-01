import {useEffect, useState} from 'react';
import gradient from 'random-gradient';
import {Link} from 'react-router-dom';

import {stringToColor} from 'helpers';
import Button from 'components/button';

import {ReactComponent as FBIcon} from 'assets/icons/fb.svg';
import {ReactComponent as InstagramIcon} from 'assets/icons/instagram.svg';
import {ReactComponent as LinkedinIcon} from 'assets/icons/linkedin.svg';
import noImagePlaceholder from 'assets/img/no-img.png';

import './../styles.scss';

const UserCard = ({user, showUserActions, showDeleteButton, showPromoteButton, handleDeleteButtonClick, handlePromoteButtonClick}) => {
  const userAbbr = `${Array.from(user.firstName)[0]}${Array.from(user.lastName)[0]}`;
  const [imageValid, setImageValid] = useState(false);

  useEffect(() => {
    const checkImage = (url) => {
      const img = new Image();

      img.src = url;
      img.onload = () => setImageValid(true);
      img.onerror = () => setImageValid(false);
    };

    if (user.avatar) {
      checkImage(user.avatar);
    }
  }, []);

  return (
    <div className='user-card' key={user.id}>
      <div className='user-top-info'>
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
            {user.avatar ? <img src={imageValid ? user.avatar : noImagePlaceholder} alt='user-avatar'/> : null}
          </div>
        </div>
        <div className='user-name-container'>
          <div>
            <b>
              <Link to={`/users/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
            </b>
          </div>
          <a
            className='user-email'
            href={`mailto:${user.email}`}
          >
            <i>{user.email}</i>
          </a>
        </div>
      </div>
      <div className='user-social-media'>
        {user.socialMedia.facebook && (
          <a href={user.socialMedia.facebook} target='_blank'>
            <FBIcon alt='facebook-icon'/>
          </a>
        )}
        {user.socialMedia.instagram && (
          <a href={user.socialMedia.instagram} target='_blank'>
            <InstagramIcon alt='instagram-icon'/>
          </a>
        )}
        {user.socialMedia.linkedIn && (
          <a href={user.socialMedia.linkedIn} target='_blank'>
            <LinkedinIcon alt='linkedin-icon'/>
          </a>
        )}
      </div>
      <a
        className='user-company-link'
        href={user.applicationId}
        target='_blank'
      >
        {user.applicationId}
      </a>
      {showUserActions && (
        <>
          <hr />
          <div className='user-actions'>
            {showDeleteButton && (
              <Button
                text='Delete'
                data-id={user.id}
                onClick={handleDeleteButtonClick}
                background='glass'
              />
            )}
            {showPromoteButton && (
              <Button
                text='Promote'
                onClick={handlePromoteButtonClick}
                background='glass'
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
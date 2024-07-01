import {stringToColor} from 'helpers';
import Avatar from 'components/avatar';

import './../styles.scss';

const UserAvatar = ({currentUserId, requestedUser, saveAvatar}) => {
  const {id, firstName, lastName, avatar} = requestedUser;

  if (id === currentUserId) {
    return (
      <Avatar
        src={avatar}
        save={saveAvatar}
        filename={id}
      />
    );
  }

  if (avatar) {
    return (
      <div className='avatar-preview'>
        <img src={avatar} alt='user-avatar'/>
      </div>
    );
  }

  return (
    <div className='user-avatar-container'>
      <div
        className='user-avatar avatar-preview'
        style={{backgroundColor: stringToColor(`${Array.from(firstName)[0] || 'U'}${Array.from(lastName)[0] || 'U'}`)}}
      >
        {`${Array.from(firstName)[0] || 'U'}${Array.from(lastName)[0] || 'U'}`}
      </div>
    </div>
  );
};

export default UserAvatar;
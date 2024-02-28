import {useEffect, useState} from 'react';
import {useOutletContext, useParams, Navigate} from 'react-router-dom';

import {withLoader} from 'helpers';
import {usePermissions} from 'components/permissions-context';
import {useSearch} from 'components/search-context';
import {useGetUserDetailsQuery, useUpdateUserDetailsMutation} from 'services/user-service';
import {useGetUserPermissionsQuery, useAssignPermissionToUserMutation} from 'services/permissions-service';
import Input from 'components/input';
import Switch from 'components/switch';

import UserAvatar from './user-avatar';
import './styles.scss';

const UserDetails = ({showLoaderBasedOnValues}) => {
  const {id} = useParams();
  const {user: currentUser} = useOutletContext();
  const {search, setSearch} = useSearch();
  const {isLoading: getUserDetailsLoading, data: userDetailsResponse} = useGetUserDetailsQuery(id);
  const [updateUserDetails, {isLoading: updateUserDetailsLoading}] = useUpdateUserDetailsMutation();
  const {permissions, allPermissions, allPermissionsLoading} = usePermissions();
  const {isLoading: userPermissionsLoading, data: userPermissions} = useGetUserPermissionsQuery({userId: id}, {skip: !permissions.includes('SHOW_PERMISSIONS')});
  const [assignPermissionToUser] = useAssignPermissionToUserMutation({skip: !permissions.includes('EDIT_PERMISSIONS')});
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  useEffect(() => {
    return () => setSearch('');
  }, []);

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues([getUserDetailsLoading, allPermissionsLoading, userPermissionsLoading, !!updateUserDetailsLoading]);
    }
  }, [getUserDetailsLoading, allPermissionsLoading, userPermissionsLoading, updateUserDetailsLoading]);

  useEffect(() => {
    setAvatar(userDetailsResponse?.data.avatar || '');
    setFirstName(userDetailsResponse?.data.firstName || '');
    setLastName(userDetailsResponse?.data.lastName || '');
    setEmail(userDetailsResponse?.data.email || '');
    setApplicationId(userDetailsResponse?.data.applicationId || '');
    setFacebook(userDetailsResponse?.data.facebook || '');
    setInstagram(userDetailsResponse?.data.instagram || '');
    setLinkedIn(userDetailsResponse?.data.linkedIn || '');
  }, [userDetailsResponse]);

  if (!permissions.includes('SHOW_ALL_USERS') && id !== currentUser.id) {
    return <Navigate to='/404' />;
  }

  const handleChangeInput = e => {
    const setter = e.target.getAttribute('data-setter');
    const setterMap = {
      setFirstName: setFirstName,
      setLastName: setLastName,
      setEmail: setEmail,
      setApplicationId: setApplicationId,
      setFacebook: setFacebook,
      setInstagram: setInstagram,
      setLinkedIn: setLinkedIn
    };

    if (!setterMap[setter]) {
      return;
    }

    setterMap[setter](e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(userDetailsResponse.data).forEach(key => {
      if (key === 'avatar') {
        return;
      }

      formData.append(key, userDetailsResponse.data[key] || '');
    });
    formData.set(e.target.name, e.target.value);

    if (userDetailsResponse.data[e.target.name] === e.target.value) {
      return;
    }

    await updateUserDetails({id, formData});
  };

  const saveAvatar = async(file) => {
    const formData = new FormData();

    Object.keys(userDetailsResponse.data).forEach(key => formData.append(key, userDetailsResponse.data[key] || ''));
    formData.set('avatar', file);

    await updateUserDetails({id, formData});
  };

  const handlePermissionChange = async(permissionId, isChecked, userId) => {
    try {
      if (!permissions.includes('EDIT_PERMISSIONS')) {
        throw new Error('You are not allowed to edit permissions');
      }

      await assignPermissionToUser({id: permissionId, userId, assign: isChecked}).unwrap();
    } catch (e) {
      console.error('Error assigning permission:', e);
    }
  };

  return (
    <div className='user-details-container'>
      <div className='user-details-picture'>
        <UserAvatar
          saveAvatar={saveAvatar}
          currentUserId={currentUser.id}
          requestedUser={{
            firstName,
            lastName,
            id,
            avatar
          }}
        />
      </div>
      <div className='user-details-main'>
        <div className='user-details-info'>
          <h3>Info</h3>
          <Input
            background='glass'
            placeholder='First Name'
            value={firstName}
            name='firstName'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setFirstName'
          />
          <Input
            background='glass'
            placeholder='Last Name'
            value={lastName}
            name='lastName'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setLastName'
          />
          <Input
            background='glass'
            placeholder='Email'
            value={email}
            name='email'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setEmail'
          />
          <Input
            background='glass'
            placeholder='Application Id'
            value={applicationId}
            name='applicationId'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setApplicationId'
          />
        </div>
        <div className='user-details-social'>
          <h3>Social media</h3>
          <Input
            background='glass'
            placeholder='Facebook'
            value={facebook}
            name='facebook'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setFacebook'
          />
          <Input
            background='glass'
            placeholder='Instagram'
            value={instagram}
            name='instagram'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setInstagram'
          />
          <Input
            background='glass'
            placeholder='Linked In'
            value={linkedIn}
            name='linkedIn'
            handleInput={handleChangeInput}
            onBlur={handleSubmit}
            error=''
            disabled={id !== currentUser.id}
            data-setter='setLinkedIn'
          />
        </div>
      </div>
      {(permissions.includes('SHOW_PERMISSIONS') && allPermissions?.length) && (
        <div className='user-details-permissions'>
          <h3>Permissions</h3>
          <div className='user-details-permissions-container'>
            {allPermissions.filter(permission => permission.name.toLowerCase().includes(search.toLowerCase()))
              .map(permission => (
                <Switch
                  key={permission.id}
                  id={`switch-${permission.id}`}
                  disabled={!permissions.includes('EDIT_PERMISSIONS')}
                  name={permission.name}
                  value={permission.name || ''}
                  turnedOn={userPermissions?.data.includes(permission.name)}
                  handleSwitch={(e) => handlePermissionChange(permission.id, e.target.checked, id)}
                  switchText={permission.name}
                  background='dark'
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withLoader(UserDetails);
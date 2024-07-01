import {useEffect, useState} from 'react';
import {useOutletContext, Navigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {useGetAllUsersQuery, useDeleteUserMutation} from 'services/user-service';

import {withLoader} from 'helpers';

import {useSearch} from 'components/search-context';
import {usePermissions} from 'components/permissions-context';
import ConfirmationModal from 'components/confirmation-modal';

import UserCard from './user-card';
import './styles.scss';

const AllUsers = ({showLoaderBasedOnValues}) => {
  const {search, setSearch} = useSearch();
  const {permissions} = usePermissions();
  const {user: currentUser} = useOutletContext();
  const {isLoading: getAllUsersLoading, data: allUsers} = useGetAllUsersQuery(currentUser.applicationId, {skip: !permissions.includes('SHOW_ALL_USERS') && !permissions.includes('SHOW_COMPANY_USERS')});
  const [deleteUser] = useDeleteUserMutation({skip: !permissions.includes('DELETE_USERS')});
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState(null);

  useEffect(() => {
    return () => setSearch('');
  }, []);

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues([getAllUsersLoading]);
    }
  }, [getAllUsersLoading]);

  if (!permissions?.includes('SHOW_ALL_USERS') && !permissions?.includes('SHOW_COMPANY_USERS')) {
    return <Navigate to='/404' />;
  }

  const handleUserDelete = e => {
    const userId = e.target.getAttribute('data-id');

    if (!userId) {
      console.error('Can not get the user ID!');

      return;
    }

    const user = allUsers.data.find(user => user.id === userId);

    setUserToBeDeleted(user);
    setShowDeleteConfirmationModal(true);
  };

  const handleCloseDeleteUserModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const confirmUserDelete = async() => {
    await deleteUser(userToBeDeleted.id);
    setShowDeleteConfirmationModal(false);
    setUserToBeDeleted(null);
  };

  return (
    <>
      <ConfirmationModal
        visible={showDeleteConfirmationModal}
        submit={confirmUserDelete}
        cancel={handleCloseDeleteUserModal}
        submitText='Yes'
        cancelText='No'
      >
        <p className='confirm-delete-user-text'>Do you really want to delete this user?</p>
        <UserCard
          user={userToBeDeleted}
          showUserActions={false}
        />
      </ConfirmationModal>
      <div className='users-container'>
        {allUsers?.data?.filter(user => currentUser.id !== user.id).filter(user => {
          return user.firstName.toLowerCase().includes(search.toLowerCase())
            || user.lastName.toLowerCase().includes(search.toLowerCase())
            || user.email.toLowerCase().includes(search.toLowerCase())
            || user.applicationId.toLowerCase().includes(search.toLowerCase());
        }).map(user => (
          <UserCard
            key={user.id}
            user={user}
            showUserActions={permissions.includes('DELETE_USERS') || permissions.includes('PROMOTE_USERS')}
            showDeleteButton={permissions.includes('DELETE_USERS')}
            showPromoteButton={permissions.includes('PROMOTE_USERS')}
            handleDeleteButtonClick={handleUserDelete}
            handlePromoteButtonClick={() => console.log('ban!')}
          />
        ))}
      </div>
    </>
  );
};

export default withLoader(AllUsers);
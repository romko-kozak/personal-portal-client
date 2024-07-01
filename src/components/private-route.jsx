import moment from 'moment';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useCheckAuthStatusQuery} from 'services/auth-service';
import {useGetUserDetailsQuery} from 'services/user-service';
import MainTemplate from 'components/main-template';

const PrivateOutlet = () => {
  const location = useLocation();
  const {isLoading: authLoading, data: authResponse} = useCheckAuthStatusQuery({}, {pollingInterval: moment.duration(30, 'm').asMilliseconds()});
  const {isLoading: userLoading, data: userDetails} = useGetUserDetailsQuery(authResponse?.data.id, {skip: !authResponse?.data});

  if (!authLoading && !userLoading) {
    return userDetails ? (
      <MainTemplate user={userDetails.data}>
        <Outlet context={{user: {...authResponse.data, ...userDetails.data}}} />
      </MainTemplate>
    ) : <Navigate to='/sign-in' state={{from: location}} />; // TODO: Implement returning to referal on login after user was logged out due to expired token
  }
};

export default PrivateOutlet;
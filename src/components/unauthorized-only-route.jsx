import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useCheckAuthStatusQuery} from 'services/auth-service';
import {withLoader} from 'helpers';

const UnauthorizedOnlyRoute = props => {
  const navigate = useNavigate();
  const {showLoaderBasedOnValues} = props;
  const {isLoading: authStatusLoading, data: authorizedUser} = useCheckAuthStatusQuery();

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues(authStatusLoading);
    }
  }, [authStatusLoading]);

  useEffect(() => {
    if (authorizedUser) {
      navigate('/');
    }
  }, [authorizedUser]);

  if (!authStatusLoading) {
    return props.children;
  }
};

export default withLoader(UnauthorizedOnlyRoute);
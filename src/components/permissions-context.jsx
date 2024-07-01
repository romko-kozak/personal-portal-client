import {createContext, useContext, useState, useEffect} from 'react';
import {useGetUserPermissionsQuery, useGetAllPermissionsQuery} from 'services/permissions-service';
import {withLoader} from 'helpers';

const PermissionsContext = createContext(null);

export const usePermissions = () => useContext(PermissionsContext);
const PermissionsProvider = ({user, children, showLoaderBasedOnValues}) => {
  const [fetchPermissions, setFetchPermissions] = useState(false);
  const {isLoading: userPermissionsLoading, data: userPermissions} = useGetUserPermissionsQuery({userId: user.id});
  const {isLoading: allPermissionsLoading, data: allPermissions} = useGetAllPermissionsQuery(undefined, {skip: !fetchPermissions});
  const [permissions, setPermissions] = useState([]);
  const [listOfPermissions, setListOfPermissions] = useState([]);

  useEffect(() => {
    const hasShowPermissions = userPermissions?.data?.includes('SHOW_PERMISSIONS');

    setFetchPermissions(hasShowPermissions);
    setPermissions(userPermissions?.data);
  }, [userPermissions]);

  useEffect(() => {
    if (fetchPermissions) {
      setListOfPermissions(allPermissions?.data);
    }
  }, [allPermissions, fetchPermissions]);

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues([userPermissionsLoading, allPermissionsLoading]);
    }
  }, [userPermissionsLoading, allPermissionsLoading]);

  return (
    <PermissionsContext.Provider value={{permissions, allPermissions: listOfPermissions, allPermissionsLoading}}>
      {userPermissionsLoading || !permissions ? '' : children}
    </PermissionsContext.Provider>
  );
};

export default withLoader(PermissionsProvider);
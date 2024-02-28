import {configureStore, combineReducers} from '@reduxjs/toolkit';

import BaseApi from 'services/base-api';
import {
  reducerPath as UsersReducerPath,
  reducer as UsersReducer
} from 'services/user-service';
import {
  reducerPath as AuthReducerPath,
  reducer as AuthReducer
} from 'services/user-service';
import {
  LocationReducerPath,
  LocationReducer,
  LocationMiddleware,
  WeatherReducerPath,
  WeatherReducer,
  WeatherMiddleware
} from 'services/third-party';
import {
  PermissionsReducerPath,
  PermissionsReducer
} from 'services/permissions-service';

import {rtkQueryErrorHandler} from 'helpers';

const store = configureStore({
  reducer: combineReducers({
    [UsersReducerPath]: UsersReducer,
    [AuthReducerPath]: AuthReducer,
    [LocationReducerPath]: LocationReducer,
    [WeatherReducerPath]: WeatherReducer,
    [PermissionsReducerPath]: PermissionsReducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([BaseApi.middleware, rtkQueryErrorHandler])
    .concat([LocationMiddleware, WeatherMiddleware])
});

export default store;
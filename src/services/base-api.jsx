import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BaseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URI,
    credentials: 'include'
  }),
  refetchOnReconnect: true,
  endpoints: () => ({})
});

export default BaseAPI;
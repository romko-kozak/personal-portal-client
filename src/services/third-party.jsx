import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const {
  useGetLocationQuery,
  reducerPath: LocationReducerPath,
  reducer: LocationReducer,
  middleware: LocationMiddleware
} = createApi({
  reducerPath: 'location',
  baseQuery: fetchBaseQuery({baseUrl: 'https://nominatim.openstreetmap.org/'}),
  endpoints: builder => ({
    getLocation: builder.query({
      query: (position) => {
        return `reverse?format=json&lat=${position.latitude}&lon=${position.longitude}`;
      }
    })
  })
});

export const {
  useGetWeatherQuery,
  reducerPath: WeatherReducerPath,
  reducer: WeatherReducer,
  middleware: WeatherMiddleware
} = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.openweathermap.org/'}),
  endpoints: builder => ({getWeather: builder.query({query: ({position, appId}) => `data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${appId}&units=metric`})})
});
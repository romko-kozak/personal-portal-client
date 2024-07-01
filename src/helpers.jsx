import {isRejectedWithValue} from '@reduxjs/toolkit';
import {useState} from 'react';
import {createPortal} from 'react-dom';

// import {endpoints} from 'services/auth-service';
import {UNAUTHORIZED_STATUS_CODE} from 'static/constants';

import Loader from 'components/full-screen-loader';

export const withLoader = WrappedComponent => componentProps => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoadingState = (loadingProps) => {
    if (typeof loadingProps === 'boolean') {
      setIsLoading(loadingProps);
    } else if (Array.isArray(loadingProps)) {
      if (loadingProps.some(el => typeof el !== 'boolean')) {
        throw new Error('Provided value must be boolean or array of booleans!');
      }

      setIsLoading(loadingProps.some(el => el));
    } else {
      throw new Error('Provided value must be boolean or array of booleans!');
    }
  };

  const loaderElement = document.getElementById('loader-container');

  return (
    <>
      {loaderElement && createPortal(isLoading ? <Loader /> : null, loaderElement)}
      <WrappedComponent {...componentProps} showLoaderBasedOnValues={handleLoadingState} />
    </>
  );
};

export const rtkQueryErrorHandler = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', action);

    if (action.payload.status === UNAUTHORIZED_STATUS_CODE) {
      console.error('User is unauthorized! Please sign in!');

      // api.dispatch(endpoints.signOut.initiate());
    }
  }

  return next(action);
};

export const stringToColor = (string, saturation = 100, lightness = 75) => {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
};

export const stringToNumber = (str) => {
  const sum = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return (sum % 100) + 1;
};

export const base64ToBlob = (base64, mimeType) => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {type: mimeType});
};
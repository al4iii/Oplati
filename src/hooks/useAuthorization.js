import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { setTokenAsyncStorage } from '../store/AsyncStorage';
import { userActionCreators } from '../slices/userSlice';

export const useAuthorization = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { setAccessToken, setRefreshToken } = userActionCreators();
  const { authorization } = userApi();

  const fetch = React.useCallback((username, password) => {
    setStatus(APIStatus.Loading);
    authorization({
      onSuccess: response => {
        setStatus(APIStatus.Success)
        setTokenAsyncStorage(response.access_token, response.refresh_token)
        setAccessToken(response.access_token)
        setRefreshToken(response.refresh_token)       
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      username,
      password,
    });
  });
  return { fetch, status };
};

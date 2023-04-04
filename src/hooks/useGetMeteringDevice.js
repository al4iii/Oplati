import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { useSelector } from 'react-redux';
import { userActionCreators } from '../slices/userSlice';

export const useGetMeteringDevice = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getMeteringDevice } = userApi();
  const { setMeteringDevice } = userActionCreators();
  const accessToken = useSelector(state => state.userData.accessToken);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getMeteringDevice({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setMeteringDevice(response)
        setToken(response.access_token, response.refresh_token)
        setAccessToken(response.access_token)
        setRefreshToken(response.refresh_token)
        setStatus(APIStatus.Loading);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      token: accessToken,
    });
  });
  return { fetch, status };
};

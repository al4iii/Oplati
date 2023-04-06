import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { userActionCreators } from '../slices/userSlice';

export const useGetMeteringDevice = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getMeteringDevice } = userApi();
  const { setMeteringDevice } = userActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getMeteringDevice({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setMeteringDevice(response)
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  });
  return { fetch, status };
};

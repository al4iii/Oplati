import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { useSelector } from 'react-redux';

export const useSendMeteringDevice = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { sendMeteringDevice } = userApi();
  const accessToken = useSelector(state => state.userData.accessToken);

  const fetch = React.useCallback((data) => {
    setStatus(APIStatus.Loading);
    sendMeteringDevice({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setStatus(APIStatus.Loading);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      token: accessToken,
      data
    });
  });
  return { fetch, status };
};

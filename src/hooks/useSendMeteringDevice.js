import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';

export const useSendMeteringDevice = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { sendMeteringDevice } = userApi();

  const fetch = React.useCallback((data) => {
    setStatus(APIStatus.Loading);
    sendMeteringDevice({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      data
    });
  });
  return { fetch, status };
};

import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { userActionCreators } from '../slices/userSlice';

export const useGetUserData = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getUserData } = userApi();
  const { setUserData } = userActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getUserData({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setUserData(response)
      },
      onError: () => { 
        setStatus(APIStatus.Failure);
      },
    });
  });
  return { fetch, status };
};

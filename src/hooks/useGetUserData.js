import React from 'react';
import { userApi } from '../api/userApi';
import { APIStatus } from '../lib/axiosAPI';
import { useSelector } from 'react-redux';
import { userActionCreators } from '../slices/userSlice';

export const useGetUserData = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getUserData } = userApi();
  const { setUserData } = userActionCreators();
  const accessToken = useSelector(state => state.userData.accessToken);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getUserData({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setUserData(response)
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

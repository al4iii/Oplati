import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_URL } from '../constants/api';
import { callAPI } from '../lib/axiosAPI';

const getUserData = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `v1/profile`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json'
      },
      ...args,
    },
  });
};

const getMeteringDevice = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `v1/metering_device`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json'
      },
      ...args,
    },
  });
};

const sendMeteringDevice = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `v1/metering_device/readings_seq`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args.token}`,
        'Content-Type': 'application/json',
      },
      ...args
    },
    data: args.data
  });
};

const authorization = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `oauth/token?grant_type=password&username=${args.username}&password=${args.password}`,
    config: {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + 'azI0LXRlc3RfOjA1MGUxZTJjLWNkYjQtNDdjYS1iNjk4LWJmOGZiZjlhNmFlMQ=='
      },
      ...args,
    },
  });
};

export const APIs = {
  getUserData,  
  getMeteringDevice,
  sendMeteringDevice,
  authorization
};

export const userApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};

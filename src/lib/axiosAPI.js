import axios from 'axios';
import { API_URL } from '../constants/api';

export const APIStatus = {
  Initial: 'Initial',
  Loading: 'Loading',
  Success: 'Success',
  Failure: 'Failure',
};

export const getCallAPI = () => props => async () => {
  const { url, payload, onError, config, customBaseUrl } = props;
  let response;
  try {
    const method = config?.method;
    if (method && method.toLowerCase() === 'put') {
      response = await axios.put((customBaseUrl || API_URL) + url, payload, config);
    } else if (method && method.toLowerCase() === 'get') {
      response = await axios.get((customBaseUrl || API_URL) + url, config);
    } else if (method && method.toLowerCase() === 'delete') {
      response = await axios.delete((customBaseUrl || API_URL) + url, config);
    } else if (method && method.toLowerCase() === 'post') {
      response = await axios({ method: 'post', url: (customBaseUrl || API_URL) + url, ...payload, ...config });
    }
    if (props.config.onSuccess) {
      props.config.onSuccess(response.data);
    } else {
      props.config.onError(response);
    }
  } catch (err) {
    props.config.onError(response);
    if (onError) {
      props.config.onError(err);
    }
  }
};

export const callAPI = getCallAPI();
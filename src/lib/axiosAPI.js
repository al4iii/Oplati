import axios from 'axios';
import { getAccessTokenAsyncStorage, getRefreshTokenAsyncStorage, removeToken } from '../store/AsyncStorage';
import { basicAuth } from '../constants/api';
import { updateToken } from './updateToken';

export const APIStatus = {
  Initial: 'Initial',
  Loading: 'Loading',
  Success: 'Success',
  Failure: 'Failure',
};

const buildConfig = async (config) => {
  const token = await getAccessTokenAsyncStorage();
  const auth = token ? `Bearer ${token}` : basicAuth;
  const headers = config?.headers ?? {};
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: auth,
    },
  };
};

const createAPICaller = (props) => async () => {
  const { url, payload, onError, config, customBaseUrl } = props;
  
  try {
    const updatedConfig = await buildConfig(config);
    const response = await axios({
      url: customBaseUrl ? `${customBaseUrl}${url}` : url,
      method: updatedConfig?.method || 'get',
      data: payload,
      ...updatedConfig,
    });

    if (config?.onSuccess) {
      config.onSuccess(response.data);
    }
    return response.data;
    
  } catch (error) {

    if (error.response?.status === 401 && error.config?.headers?.Authorization != basicAuth) {
      await updateToken();
      const updatedConfig = await buildConfig(config);
      const response = await axios({
        url: customBaseUrl ? `${customBaseUrl}${url}` : url,
        method: updatedConfig?.method || 'get',
        data: payload,
        ...updatedConfig,
      });
      if (config?.onSuccess) {
        config.onSuccess(response.data);
      }
      return response.data;
    }
    if (config?.onError) {
      await removeToken();
      config.onError(error);
    }
    if (onError) {
      onError(error);
    }
    throw error;    
  }
};

export const callAPI = createAPICaller;

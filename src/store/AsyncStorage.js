import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTokenAsyncStorage = async (access_token, refresh_token) => {
  try {
    await AsyncStorage.setItem('@access_token', access_token)
    await AsyncStorage.setItem('@refresh_token', refresh_token)
  } catch (e) {
    console.log('Error checking auth: ', e);
  }
}

export const getAccessTokenAsyncStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@access_token');
    return accessToken
  } catch (e) {
    console.log('Error checking auth: ', e);
  }
}

export const getRefreshTokenAsyncStorage = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('@refresh_token');
    return refreshToken
  } catch (e) {
    console.log('Error checking auth: ', e);
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.setItem('@access_token', "");
    await AsyncStorage.setItem('@refresh_token', "");
  } catch (e) {
    console.log('Error removing auth token: ', e);
  }
};


import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from './store/rootReducer';
import {userActionCreators} from './slices/userSlice';
import CustomActivityIndicator from './components/CustomActivityIndicator';
import AuthorizationScreen from './screen/AuthorizationScreen';
import { getAccessTokenAsyncStorage, getRefreshTokenAsyncStorage } from './store/AsyncStorage';
import TabNav from './TabNav';

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  TabNav: undefined;
  AuthorizationScreen: undefined;
};

const Router = () => {
  const {setAccessToken, setRefreshToken} = userActionCreators();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const accessToken = useSelector((state: RootState) => state.userData.accessToken );

  const checkAuth = useCallback(async () => {
    const accessToken = await getAccessTokenAsyncStorage();
    const refreshToken = await getRefreshTokenAsyncStorage();
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsLoading(false);
  }, [setAccessToken, setRefreshToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!accessToken ? (
          <Stack.Screen
            name="AuthorizationScreen"
            component={AuthorizationScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

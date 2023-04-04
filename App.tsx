import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Router from './src/Router';
import store from './src/store/rootReducer';
import {RootState} from './src/store/rootReducer';
import {Store} from '@reduxjs/toolkit';

LogBox.ignoreAllLogs();

interface AppProps {
  store: Store<RootState>;
}

const App: React.FC<AppProps> = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

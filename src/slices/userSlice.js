import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
  accessToken: "",
  refreshToken: "",
  userData: null,
  meteringDevice: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setMeteringDevice: (state, { payload }) => {
      state.meteringDevice = payload;
    },
    setLogout: (state) => {
      state = initialState;
    },
  },
});

export const userActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...userSlice.actions,
    },
    dispatch,
  );
};

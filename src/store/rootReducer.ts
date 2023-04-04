import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice';
import { UserState } from './UserData/types';

export interface RootState {
  userData: UserState;
}

const rootReducer = {
  userData: userSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store
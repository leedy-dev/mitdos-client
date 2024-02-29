import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from 'src/features/user/userSlice';
import authReducer from 'src/features/auth/authSlice';
import configReducer from 'src/features/config/configSlice';

const RootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  config: configReducer,
});

export const store = configureStore({
  reducer: RootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

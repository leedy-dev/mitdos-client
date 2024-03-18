import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from 'src/features/user/userSlice';
import menuReducer from 'src/features/menu/menuSlice';
import authReducer from 'src/features/auth/authSlice';
import configReducer from 'src/features/config/configSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    menu: menuReducer,
    config: configReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeProvider from './theme/ThemeProvider';

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loginRoutes, routes } from "./router";
import { reissueAsync } from "./features/auth/authSlice";
import { AuthState } from "./models/states/stateModel";

const App = () => {
  const content = useRoutes(routes);
  const loginContent = useRoutes(loginRoutes);

  const dispatch = useAppDispatch();

  const authSelector = useAppSelector<AuthState>(state => state.auth);

  useEffect(() => {
      if (!authSelector.isAuthenticated) {
          dispatch(reissueAsync());
      }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {
            authSelector.isAuthenticated
                ? content
                : loginContent
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeProvider from './theme/ThemeProvider';

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loginRoutes, routes } from "./router";
import { reissueAsync } from "./features/auth/authSlice";

const App = () => {
  const content = useRoutes(routes);
  const loginContent = useRoutes(loginRoutes);

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) dispatch(reissueAsync());
  }, [isAuthenticated]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {
          isAuthenticated
            ? content
            : loginContent
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;

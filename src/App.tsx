import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeProvider from './theme/ThemeProvider';
import routes from './router';

const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;

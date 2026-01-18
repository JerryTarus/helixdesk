import React, { useMemo, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';

export const HelixThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem('themeMode') || 'light'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#232629', contrastText: '#ffffff' },
          secondary: { main: '#0D9488' },
          warning: { main: '#F59E0B' },
          background: {
            default: mode === 'light' ? '#f7f7f7' : '#18191a',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          divider:
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(255, 255, 255, 0.08)',
        },
        typography: {
          fontFamily: '"Manrope", sans-serif',
          h1: { fontWeight: 800 },
          button: { fontWeight: 700, textTransform: 'none' },
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

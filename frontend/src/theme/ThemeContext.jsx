// frontend/src/theme/ThemeContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const HelixThemeProvider = ({ children }) => {
  // Persistence: Check localStorage for user preference
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newMode);
        return newMode;
      });
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#232629', // Primary Dark
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0D9488', // Emerald Accent
      },
      warning: {
        main: '#F59E0B', // Amber Accent
      },
      background: {
        default: mode === 'light' ? '#f7f7f7' : '#18191a',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    },
    typography: {
      fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontWeight: 800, letterSpacing: '-0.01em' },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': { boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' },
          },
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
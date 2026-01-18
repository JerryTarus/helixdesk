// frontend/src/theme/HelixTheme.js
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#232629',
    },
    secondary: {
      main: '#0D9488', // Emerald Accent
    },
    warning: {
      main: '#F59E0B', // Amber Accent
    },
    background: {
      default: mode === 'light' ? '#F7F7F7' : '#18191A',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
    h1: { fontWeight: 800 },
  },
  shape: {
    borderRadius: 8,
  },
});
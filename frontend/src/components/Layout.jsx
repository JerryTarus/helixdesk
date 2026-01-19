import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../pages/Sidebar';
import { useAuth } from '../context/useAuth';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Do not show sidebar on public pages or OTP verification
  const publicPages = ['/', '/login', '/verify-otp', '/register'];
  const isPublic = publicPages.includes(location.pathname);

  if (isPublic || !user) {
    return <Box>{children}</Box>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ 
        flexGrow: 1, 
        ml: '280px', // Matches sidebar width
        minHeight: '100vh',
        bgcolor: '#F8FAFC'
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
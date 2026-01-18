// frontend/src/pages/AuthSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress, Typography } from '@mui/material';

const AuthSuccess = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const finalize = async () => {
      // Refresh user state from the HttpOnly cookie set by backend
      await checkAuth();
      navigate('/dashboard');
    };
    finalize();
  }, [checkAuth, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress color="secondary" sx={{ mb: 2 }} />
      <Typography variant="body2" fontWeight={700} color="text.secondary">
        Securing your session...
      </Typography>
    </Box>
  );
};

export default AuthSuccess;
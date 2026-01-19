// frontend/src/pages/VerifyOTP.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, Stack, Button, TextField } from '@mui/material';
import { Security } from '@mui/icons-material';
import { useLocation } from 'react-router-dom'; 
import api from '../api/axios';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const location = useLocation();
  
  // Extract email from URL: http://localhost:5173/verify-otp?email=...
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) return toast.error("Please enter the full code");

    try {
      await api.post('/auth/verify-otp', { email, otp: fullOtp });
      toast.success("Security Verified!");
      
      // Redirect with full page reload to ensure auth cookies are recognized
      window.location.href = '/dashboard'; 
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Code");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F8FAFC' }}>
      <Paper sx={{ p: 6, maxWidth: 450, textAlign: 'center', borderRadius: 5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <Box sx={{ bgcolor: '#F0FDFA', color: '#0D9488', p: 2, borderRadius: '50%', width: 60, height: 60, mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Security fontSize="large" />
        </Box>
        <Typography variant="h5" fontWeight={900}>Verify Identity</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Sent to <strong>{email}</strong>
        </Typography>
        
        <Stack direction="row" spacing={1} justifyContent="center" mb={4}>
          {otp.map((digit, i) => (
            <TextField 
              key={i} 
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              variant="outlined" 
              inputProps={{ style: { textAlign: 'center', fontWeight: 900, fontSize: '1.2rem' } }} 
              sx={{ width: 50 }} 
            />
          ))}
        </Stack>

        <Button 
          onClick={handleVerify}
          variant="contained" 
          fullWidth 
          size="large" 
          sx={{ bgcolor: '#0D9488', py: 1.8, borderRadius: 2, fontWeight: 700, '&:hover': { bgcolor: '#0a7a6f' } }}
        >
          Verify & Access Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default VerifyOTP;
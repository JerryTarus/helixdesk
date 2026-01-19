import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowForward, AccountCircle, Lock, Business } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const steps = ['Identity', 'Security', 'Initialize'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ 
    full_name: '', email: '', password: '', department: '' 
  });
  const navigate = useNavigate();

  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleSubmit = async () => {
    try {
      await api.post('/auth/register', formData);
      toast.success("Account created! Check your email for OTP.");
      navigate(`/verify-otp?email=${formData.email}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F1F5F9', p: 3 }}>
      <Paper sx={{ width: '100%', maxWidth: 500, p: 5, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={900} color="#0D9488" textAlign="center" mb={1}>Create Account</Typography>
        <Typography color="text.secondary" textAlign="center" mb={4}>Join the HelixDesk Enterprise ecosystem.</Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
        </Stepper>

        <Stack spacing={3}>
          {activeStep === 0 && (
            <>
              <TextField label="Full Name" fullWidth value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
              <TextField label="Email" fullWidth value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </>
          )}

          {activeStep === 1 && (
            <>
              <TextField label="Password" type="password" fullWidth value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              <TextField label="Confirm Password" type="password" fullWidth />
            </>
          )}

          {activeStep === 2 && (
            <TextField label="Primary Department" select SelectProps={{ native: true }} fullWidth value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="HR">Human Resources</option>
            </TextField>
          )}

          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            onClick={activeStep === 2 ? handleSubmit : handleNext}
            sx={{ bgcolor: '#1E293B', py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            {activeStep === 2 ? 'Complete Registration' : 'Continue'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;
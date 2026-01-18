// frontend/src/pages/Login.jsx
import React from 'react';
import { 
  Box, Container, Typography, TextField, Button, Checkbox, 
  FormControlLabel, Divider, Link, Paper, InputAdornment, IconButton 
} from '@mui/material';
import { Mail, Lock, VisibilityOff, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion'; 
import { useAuth } from '../context/useAuth';

const Login = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Box 
      component={motion.div} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        bgcolor: 'background.default',
        background: 'linear-gradient(180deg, rgba(13, 148, 136, 0.05) 0%, transparent 100%)' 
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" fontWeight={900} sx={{ 
                background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Log in to manage your tickets and support requests.
              </Typography>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                placeholder="e.g., agent.smith@helixdesk.uk"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end"><VisibilityOff /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Keep me signed in"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 56 }}
                endIcon={<ArrowForward />}
              >
                Sign In to Workspace
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={loginWithGoogle}
              startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="G" />}
              sx={{ height: 56, color: 'text.primary', borderColor: 'divider' }}
            >
              Sign in with Google
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
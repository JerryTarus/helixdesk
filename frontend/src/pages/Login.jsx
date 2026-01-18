// frontend/src/pages/Login.jsx
import React from 'react';
import { 
  Box, Container, Typography, TextField, Button, Checkbox, 
  FormControlLabel, Divider, Link, Paper, InputAdornment, IconButton 
} from '@mui/material';
import { Mail, Lock, VisibilityOff, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Box 
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
              <Typography variant="h4" component="h1" gutterBottom sx={{ 
                background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Log in to manage your tickets and support requests.
              </Typography>
            </Box>

            <form onSubmit={(e) => e.preventDefault()}>
              <Box mb={3}>
                <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: 'block', ml: 0.5 }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., agent.smith@helixdesk.uk"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" fontWeight={700} sx={{ ml: 0.5 }}>Password</Typography>
                  <Link href="#" variant="caption" fontWeight={700} color="secondary" underline="hover">
                    Forgot Password?
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <VisibilityOff sx={{ fontSize: 20 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <FormControlLabel
                control={<Checkbox color="secondary" size="small" />}
                label={<Typography variant="body2" color="text.secondary">Keep me signed in for 30 days</Typography>}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                endIcon={<ArrowForward />}
                sx={{ height: 56, borderRadius: 2 }}
              >
                Sign In to Workspace
              </Button>
            </form>

            <Box my={4} position="relative">
              <Divider>
                <Typography variant="caption" color="text.disabled" sx={{ px: 2, fontWeight: 700 }}>
                  OR CONTINUE WITH
                </Typography>
              </Divider>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="Google" />}
              onClick={loginWithGoogle}
              sx={{ 
                height: 56, 
                borderRadius: 2, 
                borderColor: 'divider',
                color: 'text.primary',
                fontWeight: 600,
                '&:hover': { bgcolor: 'action.hover', borderColor: 'text.secondary' }
              }}
            >
              Sign in with Google
            </Button>

            <Typography variant="body2" align="center" mt={4} color="text.secondary">
              Don't have an account? {' '}
              <Link href="#" color="secondary" fontWeight={700} underline="hover">
                Create a portal account
              </Link>
            </Typography>
          </Paper>
        </motion.div>

        <Box textAlign="center" mt={6} display="flex" flexDirection="column" alignItems="center" gap={2}>
           <Box sx={{ 
              display: 'inline-flex', 
              px: 2, py: 0.5, 
              borderRadius: 10, 
              bgcolor: 'rgba(13, 148, 136, 0.1)', 
              border: '1px solid rgba(13, 148, 136, 0.2)',
              color: 'secondary.main'
           }}>
              <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>ENTERPRISE SECURE ACCESS</Typography>
           </Box>
           <Typography variant="caption" color="text.disabled" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
             This system is protected by multi-layered encryption. Session data is handled according to enterprise-grade GDPR protocols.
           </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
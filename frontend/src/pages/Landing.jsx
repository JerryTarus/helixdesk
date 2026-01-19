import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Speed, Group, ArrowForward, Layers } from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ bgcolor: '#0D9488', p: 0.5, borderRadius: 1.5, display: 'flex' }}>
                <Layers sx={{ color: 'white' }} />
              </Box>
              <Typography variant="h6" fontWeight={900} color="#1E293B">HelixDesk</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Features', 'Roles', 'Enterprise Security'].map((item) => (
                <Typography key={item} variant="body2" fontWeight={600} color="#64748B" sx={{ cursor: 'pointer' }}>{item}</Typography>
              ))}
            </Stack>
            <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#1E293B', fontWeight: 700, px: 3, borderRadius: 2 }}>Log In</Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 12, pb: 15 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <Typography variant="overline" sx={{ color: '#0D9488', fontWeight: 900, letterSpacing: 1.5 }}>ENTERPRISE READY</Typography>
              <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, mb: 3, color: '#0F172A' }}>
                Streamline Support with HelixDesk
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748B', mb: 5, fontWeight: 400, lineHeight: 1.6 }}>
                An intelligent, secure, and scalable helpdesk solution designed for modern enterprise workflows and high-performance teams.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/login')} endIcon={<ArrowForward />} sx={{ bgcolor: '#0D9488', px: 4, py: 1.5, borderRadius: 2, fontWeight: 700 }}>Request Demo</Button>
                <Button variant="outlined" size="large" sx={{ borderColor: '#E2E8F0', color: '#1E293B', px: 4, py: 1.5, borderRadius: 2, fontWeight: 700 }}>View Documentation</Button>
              </Stack>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
             {/* Abstract Dashboard Graphic */}
             <Paper elevation={20} sx={{ p: 2, borderRadius: 4, bgcolor: '#F1F5F9', border: '8px solid white' }}>
                <Box sx={{ height: 300, bgcolor: 'white', borderRadius: 2 }} />
             </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
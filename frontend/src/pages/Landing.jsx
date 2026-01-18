import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layers, Speed, Shield, AutoGraph } from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      {/* Navbar */}
      <Container maxWidth="lg" sx={{ py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ bgcolor: 'primary.main', p: 0.5, borderRadius: 1 }}><Layers sx={{ color: 'white' }} /></Box>
          <Typography variant="h6" fontWeight={900} letterSpacing={-1}>HELIXDESK</Typography>
        </Stack>
        <Button onClick={() => navigate('/login')} variant="contained" color="secondary" sx={{ borderRadius: 2, fontWeight: 700 }}>
          Sign In
        </Button>
      </Container>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 3, letterSpacing: -2 }}>
          Modern Helpdesk for <span style={{ color: '#0D9488' }}>Enterprise</span>
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6, lineHeight: 1.6 }}>
          A Dissertation Project exploring high-performance support architectures, 
          SLA-driven workflows, and role-based security.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={() => navigate('/login')} size="large" variant="contained" color="primary" sx={{ px: 6, py: 2, borderRadius: 3, fontWeight: 900 }}>
            Get Started
          </Button>
          <Button size="large" variant="outlined" color="inherit" sx={{ px: 6, py: 2, borderRadius: 3, fontWeight: 900 }}>
            View Thesis
          </Button>
        </Stack>
      </Container>

      {/* Features */}
      <Container maxWidth="lg" sx={{ pb: 15 }}>
        <Grid container spacing={4}>
          {[
            { icon: <Speed color="secondary" />, title: 'SLA Engine', desc: 'Automated priority tracking and breach alerts.' },
            { icon: <Shield color="secondary" />, title: 'Enterprise Auth', desc: 'Secure Google OAuth2 with HttpOnly sessions.' },
            { icon: <AutoGraph color="secondary" />, title: 'Real-time Analytics', desc: 'Deep insights into agent performance.' }
          ].map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #eee', boxShadow: 'none' }}>
                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={800} gutterBottom>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Grid, Paper, Stack } from '@mui/material';
import { Search, Book, Lightbulb, Description } from '@mui/icons-material';

const KnowledgeBase = () => {
  const [query, setQuery] = useState('');

  const articles = [
    { title: 'Setting up Eduroam Wi-Fi', cat: 'Network', icon: <Book /> },
    { title: 'Student ID Replacement', cat: 'Admin', icon: <Description /> },
    { title: 'Accessing Microsoft 365', cat: 'Software', icon: <Lightbulb /> },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={900} gutterBottom>How can we help?</Typography>
          <TextField
            fullWidth
            placeholder="Search for solutions (e.g., 'VPN', 'Password')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              sx: { borderRadius: 4, bgcolor: 'white', py: 1 }
            }}
          />
        </Box>

        <Typography variant="h6" fontWeight={800} mb={3}>Popular Articles</Typography>
        <Grid container spacing={3}>
          {articles.map((art, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper sx={{ p: 3, borderRadius: 4, cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'translateY(-5px)', borderColor: '#0D9488' }, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Box sx={{ color: '#0D9488', mb: 2 }}>{art.icon}</Box>
                <Typography variant="subtitle1" fontWeight={800}>{art.title}</Typography>
                <Typography variant="caption" color="text.disabled">{art.cat.toUpperCase()}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default KnowledgeBase;
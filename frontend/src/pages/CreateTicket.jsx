import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Grid, Paper, 
  MenuItem, Stepper, Step, StepLabel, Breadcrumbs, Link
} from '@mui/material';
import { Send, Save, Cancel, Info } from '@mui/icons-material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'MEDIUM',
    department: 'Information Technology',
    category: 'Software Bug'
  });

const handleSubmit = async () => {
  try {
    await api.post('/tickets', formData);
    navigate('/dashboard');
  } catch (err) {
    console.error('Error creating ticket:', err);
    alert('Error creating ticket');
  }
};


  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/dashboard">Helpdesk</Link>
          <Typography color="text.primary" fontWeight={700}>Create New Ticket</Typography>
        </Breadcrumbs>

        <Typography variant="h3" fontWeight={900} gutterBottom>Create New Ticket</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>Initialize a support request. Ensure all required fields are filled to meet SLA targets.</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stepper orientation="vertical" activeStep={1}>
                <Step><StepLabel>Ticket Details</StepLabel></Step>
                <Step><StepLabel>Classification</StepLabel></Step>
                <Step><StepLabel>Attachments</StepLabel></Step>
              </Stepper>
              <Box sx={{ mt: 4, p: 2, bgcolor: 'warning.main', borderRadius: 2, color: 'white' }}>
                <Typography variant="caption" fontWeight={900} display="flex" alignItems="center" gap={1}>
                  <Info fontSize="small" /> SLA NOTICE
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Urgent (P1) tickets trigger a 2-hour response window.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    select fullWidth label="Department" 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    select fullWidth label="Priority" 
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <MenuItem value="LOW">P4 - Low</MenuItem>
                    <MenuItem value="MEDIUM">P3 - Medium</MenuItem>
                    <MenuItem value="HIGH">P2 - High</MenuItem>
                    <MenuItem value="URGENT">P1 - Urgent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth label="Subject Line" 
                    placeholder="Brief summary..."
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth multiline rows={6} label="Detailed Description" 
                    placeholder="Describe the steps to reproduce..."
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button startIcon={<Cancel />} color="inherit">Discard</Button>
                <Box gap={2} display="flex">
                  <Button startIcon={<Save />} variant="outlined">Save Draft</Button>
                  <Button 
                    startIcon={<Send />} 
                    variant="contained" 
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    Submit Ticket
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateTicket;
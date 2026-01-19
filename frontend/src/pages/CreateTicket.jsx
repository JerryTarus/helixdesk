// frontend/src/pages/CreateTicket.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Stack
} from '@mui/material';
import { CloudUpload, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PageTransition from '../components/PageTransition';
import toast from 'react-hot-toast'; // Added toast import

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'LOW',
    department: 'IT'
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // MUST use FormData for file uploads
    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('description', formData.description);
    data.append('priority', formData.priority);
    data.append('department', formData.department);

    if (file) data.append('attachment', file);

    try {
      await api.post('/tickets', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Success Toast
      toast.success('Ticket submitted successfully! Our team is on it.', {
        duration: 4000,
        style: { 
          borderRadius: '10px', 
          background: '#333', 
          color: '#fff' 
        }
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Ticket creation failed:', err);
      // Error Toast
      toast.error('Could not submit ticket. Please check your file size.');
    }
  };

  return (
    <PageTransition>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none'
            }}
          >
            <Typography variant="h5" fontWeight={900} mb={3}>
              Submit Support Request
            </Typography>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Stack spacing={3}>
                <TextField
                  label="Subject"
                  fullWidth
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />

                <TextField
                  label="Department"
                  select
                  fullWidth
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <MenuItem value="IT">IT Support</MenuItem>
                  <MenuItem value="HR">Human Resources</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </TextField>

                <TextField
                  label="Priority"
                  select
                  fullWidth
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                </TextField>

                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{ py: 1.5, borderStyle: 'dashed', fontWeight: 700 }}
                >
                  {file ? file.name : 'Upload Screenshot (Optional)'}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Send />}
                  sx={{ fontWeight: 900 }}
                >
                  Submit Ticket
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default CreateTicket;
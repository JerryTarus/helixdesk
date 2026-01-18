// frontend/src/pages/AgentTicketWorkspace.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Grid, Paper, Typography, TextField, Button, Avatar, 
  Chip, Stack, Divider, Tab, Tabs, List, ListItemText, CircularProgress 
} from '@mui/material';
import { Send, Lock, Public, History } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const AgentTicketWorkspace = () => {
  const { id } = useParams(); 
  const [tab, setTab] = useState(0); 
  const [reply, setReply] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use 'api' and 'id' to fetch real data
  const fetchTicketDetails = useCallback(async () => {
    try {
      const res = await api.get(`/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      console.error("Error loading ticket:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // 'useEffect' is now used
  useEffect(() => {
    fetchTicketDetails();
  }, [fetchTicketDetails]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>;
  if (!ticket) return <Typography sx={{ p: 4 }}>Ticket not found.</Typography>;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f1f5f9' }}>
      <Grid container spacing={0}>
        {/* Left Pane */}
        <Grid item xs={3} sx={{ borderRight: '1px solid', borderColor: 'divider', bgcolor: 'white', p: 3 }}>
          <Typography variant="overline" fontWeight={900} color="text.disabled">TICKET PROPERTIES</Typography>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Status</Typography>
              <Chip label={ticket.status} size="small" sx={{ ml: 2, bgcolor: '#0D9488', color: 'white', fontWeight: 900 }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Priority</Typography>
              <Chip label={ticket.priority} size="small" variant="outlined" color="error" sx={{ ml: 2, fontWeight: 900 }} />
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" fontWeight={800}>Requester</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Avatar src={ticket.requester_avatar} sx={{ width: 24, height: 24 }} />
                <Typography variant="body2">{ticket.requester_name || "Client"}</Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Center Pane */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 1 }}>{ticket.subject}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{ticket.description}</Typography>
            <Divider sx={{ mb: 3 }} />
            {/* Thread mapping would go here */}
          </Box>
          
          <Paper sx={{ m: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ px: 2, pt: 1 }}>
              <Tab icon={<Public fontSize="small" />} iconPosition="start" label="Public Reply" />
              <Tab icon={<Lock fontSize="small" />} iconPosition="start" label="Internal Note" />
            </Tabs>
            <TextField 
              fullWidth multiline rows={4} 
              placeholder={tab === 0 ? "Type your response..." : "Internal private note..."}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              sx={{ p: 2, '& fieldset': { border: 'none' } }}
            />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', bgcolor: 'action.hover' }}>
              <Button variant="contained" color={tab === 0 ? "secondary" : "warning"} startIcon={<Send />}>
                {tab === 0 ? "Send Reply" : "Save Private Note"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Pane */}
        <Grid item xs={3} sx={{ borderLeft: '1px solid', borderColor: 'divider', bgcolor: 'white', p: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <History fontSize="small" color="disabled" />
            <Typography variant="overline" fontWeight={900} color="text.disabled">USER HISTORY</Typography>
          </Stack>
          <List>
            <ListItemText primary="Previous ticket: #TK-1122" secondary="Resolved 4 days ago" />
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentTicketWorkspace;
import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, Avatar, Chip, Stack, Divider, Tab, Tabs } from '@mui/material';
import { Send, History, Lock, Public, AssignmentInd } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const AgentTicketWorkspace = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0); // 0 = Public Reply, 1 = Internal Note
  const [reply, setReply] = useState('');

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f1f5f9' }}>
      <Grid container spacing={0}>
        
        {/* Left Pane: Ticket Metadata (25%) */}
        <Grid item xs={3} sx={{ borderRight: '1px solid', borderColor: 'divider', bgcolor: 'white', p: 3 }}>
          <Typography variant="overline" fontWeight={900} color="text.disabled">TICKET PROPERTIES</Typography>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Status</Typography>
              <Chip label="OPEN" size="small" sx={{ ml: 2, bgcolor: '#0D9488', color: 'white', fontWeight: 900 }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Priority</Typography>
              <Chip label="HIGH" size="small" variant="outlined" color="error" sx={{ ml: 2, fontWeight: 900 }} />
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" fontWeight={800}>Requester</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Avatar sx={{ width: 24, height: 24 }} />
                <Typography variant="body2">Michael Chen</Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Center Pane: Conversation (50%) */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 3 }}>Server auth failure in EMEA</Typography>
            {/* Messages would map here */}
          </Box>
          
          {/* Reply Area */}
          <Paper sx={{ m: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ px: 2, pt: 1 }}>
              <Tab icon={<Public fontSize="small" />} iconPosition="start" label="Public Reply" />
              <Tab icon={<Lock fontSize="small" />} iconPosition="start" label="Internal Note" />
            </Tabs>
            <TextField 
              fullWidth multiline rows={4} 
              placeholder={tab === 0 ? "Type your response to the user..." : "Only other agents will see this note..."}
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

        {/* Right Pane: History & Apps (25%) */}
        <Grid item xs={3} sx={{ borderLeft: '1px solid', borderColor: 'divider', bgcolor: 'white', p: 3 }}>
          <Typography variant="overline" fontWeight={900} color="text.disabled">USER HISTORY</Typography>
          <List>
            <ListItemText primary="Previous ticket: #TK-1122" secondary="Resolved 4 days ago" />
          </List>
        </Grid>

      </Grid>
    </Box>
  );
};

export default AgentTicketWorkspace;
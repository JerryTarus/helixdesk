// frontend/src/pages/AgentDashboard.jsx
import React, { useEffect, useState } from 'react'; // Removed useCallback here
import { 
  Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Chip, Avatar, Stack
} from '@mui/material';
import { Layers, Dashboard as DashIcon } from '@mui/icons-material';
import api from '../api/axios';
import { useAuth } from '../context/useAuth';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);


  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await api.get('/tickets/agent-queue');
        if (isMounted) {
          setTickets(res.data);
        }
      } catch (err) {
        console.error("Queue fetch error", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []); // EMPTY ARRAY: Runs exactly once on mount. 

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Drawer variant="permanent" sx={{ width: 260, '& .MuiDrawer-paper': { width: 260, bgcolor: '#18191a', color: 'white' } }}>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ bgcolor: '#0D9488', p: 0.5, borderRadius: 1 }}><Layers fontSize="small" /></Box>
          <Typography variant="subtitle2" fontWeight={900}>HD-CORE</Typography>
        </Box>
        <List sx={{ px: 2 }}>
          <ListItem sx={{ borderRadius: 2, mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }}>
            <ListItemIcon><Layers sx={{ color: '#0D9488' }} /></ListItemIcon>
            <ListItemText primary="My Queue" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ height: 64, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, bgcolor: 'background.paper' }}>
           <Typography variant="caption" fontWeight={700}>Queue Overview</Typography>
           <Avatar src={user?.avatar_url} sx={{ width: 32, height: 32 }} />
        </Box>
        
        <Box sx={{ p: 6 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight={900}>Agent Queue</Typography>
              <Typography color="text.secondary">Reviewing {tickets.length} tickets assigned to you.</Typography>
            </Box>
          </Stack>

          <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
            <Table>
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>TICKET ID</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>SUBJECT</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>PRIORITY</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, fontSize: 11 }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <TableRow key={ticket.id} hover>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{ticket.ticket_key}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Chip label={ticket.priority} size="small" color={ticket.priority === 'URGENT' ? 'error' : 'default'} />
                      </TableCell>
                      <TableCell align="right">{ticket.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" sx={{ py: 4, color: 'text.secondary' }}>No tickets found in your queue.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AgentDashboard;
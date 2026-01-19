// frontend/src/pages/UserPortal.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, Grid, Paper, Typography, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Stack, Container
} from '@mui/material';
import { 
  Dashboard as DashIcon, ConfirmationNumber, MenuBook, Person, 
  Search, Notifications, AddCircle, Drafts, PendingActions, TaskAlt, Logout as LogoutIcon,
  AccessTime, CheckCircleOutline
} from '@mui/icons-material';
import { useAuth } from '../context/useAuth';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion'; 
import api from '../api/axios';

const UserPortal = () => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await api.get('/tickets/my-tickets');
        setTickets(res.data || []);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, []);

  // Compute stats dynamically from tickets
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const stats = [
    { label: 'Open', value: openCount, icon: <Drafts />, color: '#232629' },
    { label: 'In Progress', value: inProgressCount, icon: <PendingActions />, color: '#0D9488' },
    { label: 'Resolved', value: resolvedCount, icon: <TaskAlt />, color: '#64748b' },
  ];

  return (
    <PageTransition>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 260,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 260, borderRight: '1px solid', borderColor: 'divider' },
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1, borderRadius: 2 }}>
              <ConfirmationNumber />
            </Box>
            <Typography variant="h6" fontWeight={800}>HelixDesk</Typography>
          </Box>
          
          <List sx={{ px: 2, flexGrow: 1 }}>
            <ListItem button sx={{ borderRadius: 2, mb: 1, bgcolor: 'rgba(13, 148, 136, 0.1)', color: 'secondary.main' }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><DashIcon /></ListItemIcon>
              <ListItemText primary={<Typography variant="body2" fontWeight={700}>Dashboard</Typography>} />
            </ListItem>
            <ListItem button sx={{ borderRadius: 2, mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}><ConfirmationNumber /></ListItemIcon>
              <ListItemText primary={<Typography variant="body2" fontWeight={700}>My Tickets</Typography>} />
            </ListItem>
          </List>

          <Box sx={{ p: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Button fullWidth color="error" startIcon={<LogoutIcon />} onClick={logout} sx={{ justifyContent: 'flex-start', fontWeight: 700 }}>
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          {/* Welcome Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Good morning, {user?.full_name?.split(' ')[0] || 'User'}
                </Typography>
                <Typography color="text.secondary">
                  You have <span style={{ color: '#0D9488', fontWeight: 700 }}>{inProgressCount} active tickets</span> today.
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" startIcon={<AddCircle />} sx={{ borderRadius: 3, px: 4, py: 1.5 }}>
                Create New Ticket
              </Button>
            </Box>
          </motion.div>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={stat.label}>
                <Box 
                  component={motion.div} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${stat.color}15`, color: stat.color }}>{stat.icon}</Box>
                      <Typography variant="caption" fontWeight={800} color="text.disabled">{stat.label.toUpperCase()}</Typography>
                    </Box>
                    <Typography variant="h3" fontWeight={900}>{stat.value}</Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Recent Tickets Section */}
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Recent Tickets</Typography>
          
          {loading ? (
            <Typography variant="body2" color="text.secondary">Loading your tickets...</Typography>
          ) : tickets.length === 0 ? (
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <Typography variant="body1" color="text.secondary">No tickets found.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {tickets.map((ticket) => (
                <Grid item xs={12} key={ticket.id}>
                  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" fontWeight={800}>{ticket.subject}</Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <Chip 
                            label={ticket.status} 
                            size="small" 
                            color={
                              ticket.status === 'Open' ? 'default' :
                              ticket.status === 'In Progress' ? 'secondary' :
                              'success'
                            }
                            sx={{ fontWeight: 700 }}
                          />
                          
                          {/* SLA Deadline Display */}
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <AccessTime sx={{ fontSize: 16, color: 'text.disabled' }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={700}>
                              Expected by: {ticket.due_date 
                                ? new Date(ticket.due_date).toLocaleDateString() 
                                : 'TBD'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                      <CheckCircleOutline color="disabled" />
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </PageTransition>
  );
};

import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider 
} from '@mui/material';

export default UserPortal;
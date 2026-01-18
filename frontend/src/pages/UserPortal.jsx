// frontend/src/pages/UserPortal.jsx
import React from 'react';
import { 
  Box, Grid, Paper, Typography, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, IconButton, Badge, InputBase, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { 
  Dashboard as DashIcon, ConfirmationNumber, MenuBook, Person, 
  Search, Notifications, AddCircle, Drafts, PendingActions, TaskAlt, Logout as LogoutIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion'; 
import { useAuth } from '../context/useAuth';

const UserPortal = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Open', value: 5, icon: <Drafts />, color: '#232629' },
    { label: 'In Progress', value: 2, icon: <PendingActions />, color: '#0D9488' },
    { label: 'Resolved', value: 14, icon: <TaskAlt />, color: '#64748b' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
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

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {/* Animated Welcome Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight={800}>Good morning, {user?.full_name?.split(' ')[0]}</Typography>
              <Typography color="text.secondary">You have <span style={{ color: '#0D9488', fontWeight: 700 }}>2 active tickets</span> today.</Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddCircle />} sx={{ borderRadius: 3, px: 4, py: 1.5 }}>
              Create New Ticket
            </Button>
          </Box>
        </motion.div>

        {/* Animated Stats Cards */}
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

        {/* Recent Tickets Table Section remains same but now compiles cleanly */}
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Recent Tickets</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, fontSize: 10, color: 'text.disabled' }}>TICKET ID</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: 10, color: 'text.disabled' }}>SUBJECT</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: 10, color: 'text.disabled' }}>PRIORITY</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: 10, color: 'text.disabled' }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover sx={{ cursor: 'pointer' }}>
                <TableCell sx={{ fontWeight: 700 }}>#TK-8842</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={700}>Access request for Lab 4B</Typography>
                  <Typography variant="caption" color="text.secondary">Updated 2h ago</Typography>
                </TableCell>
                <TableCell>
                   <Box sx={{ px: 1.5, py: 0.5, borderRadius: 10, bgcolor: 'warning.main', color: 'white', fontSize: 10, fontWeight: 900, display: 'inline-block' }}>HIGH</Box>
                </TableCell>
                <TableCell><Typography variant="body2" color="secondary.main" fontWeight={800}>In Progress</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserPortal;
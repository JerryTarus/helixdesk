// frontend/src/components/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Avatar, Stack } from '@mui/material';
import { 
  Assessment, People, History, Dashboard as DashIcon, 
  Logout, Layers, ConfirmationNumber, Settings 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Safely get user role (handle loading state)
  const userRole = user?.role?.toUpperCase() || '';

  const menuItems = [
    { text: 'Analytics', icon: <Assessment />, path: '/dashboard', roles: ['ADMIN'] },
    { text: 'User Management', icon: <People />, path: '/admin/users', roles: ['ADMIN'] },
    { text: 'System Logs', icon: <History />, path: '/admin/logs', roles: ['ADMIN'] },
    { text: 'Agent Queue', icon: <DashIcon />, path: '/dashboard', roles: ['AGENT'] },
    { text: 'My Tickets', icon: <ConfirmationNumber />, path: '/dashboard', roles: ['USER', 'END_USER'] },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <Box sx={{ 
      width: 280, height: '100vh', bgcolor: 'white', 
      borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0
    }}>
      {/* Brand Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ bgcolor: '#0D9488', p: 0.5, borderRadius: 1.5, display: 'flex' }}>
          <Layers sx={{ color: 'white' }} />
        </Box>
        <Typography variant="h6" fontWeight={900} color="#1E293B">HelixDesk</Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ px: 2, color: 'text.disabled', fontWeight: 900, letterSpacing: 1, mb: 1, display: 'block' }}>
          CORE
        </Typography>
        {visibleMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              button 
              key={item.path} 
              onClick={() => navigate(item.path)} 
              sx={{ 
                borderRadius: 2, 
                mb: 0.5,
                bgcolor: isActive ? '#F0FDFA' : 'transparent',
                color: isActive ? '#0D9488' : '#64748B',
                '&:hover': { bgcolor: '#F8FAFC' }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="body2" fontWeight={isActive ? 800 : 600}>{item.text}</Typography>} />
            </ListItem>
          );
        })}
      </List>

      {/* User Profile & Logout */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, px: 1 }}>
          <Avatar src={user?.avatar_url} sx={{ width: 36, height: 36, border: '2px solid #0D9488' }} />
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body2" fontWeight={800} noWrap>{user?.full_name || 'Loading...'}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700 }}>{user?.role || 'Guest'}</Typography>
          </Box>
        </Stack>
        <ListItem 
          button 
          onClick={logout} 
          sx={{ 
            borderRadius: 2, 
            color: '#EF4444', 
            '&:hover': { bgcolor: '#FEF2F2' } 
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon>
          <ListItemText primary={<Typography variant="body2" fontWeight={700}>Logout</Typography>} />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
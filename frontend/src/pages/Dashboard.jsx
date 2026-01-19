import React from 'react';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress, Typography } from '@mui/material';

// Import the specific dashboards we built
import AdminAnalytics from './AdminAnalytics';
import AgentDashboard from './AgentDashboard';
import UserPortal from './UserPortal';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // 1. Show a professional loader while fetching the session
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F8FAFC' }}>
        <CircularProgress sx={{ color: '#0D9488' }} />
      </Box>
    );
  }

  // 2. If no user is found after loading, the session failed
  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Session Error: User not authenticated.</Typography>
        <Typography variant="body2">Please try logging in again via the portal.</Typography>
      </Box>
    );
  }

  // 3. Normalize the role from the Database
  const role = user.role?.toUpperCase();

  // 4. Role-Based Rendering Logic
  switch (role) {
    case 'ADMIN':
      return <AdminAnalytics />;
    case 'AGENT':
      return <AgentDashboard />;
    case 'END_USER':
    case 'USER':
      return <UserPortal />;
    default:
      // Fallback for dissertation safety
      return <UserPortal />;
  }
};

export default Dashboard;
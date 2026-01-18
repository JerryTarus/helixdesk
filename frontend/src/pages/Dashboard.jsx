import React from 'react';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress } from '@mui/material';

// These components are the actual screens
import UserPortal from './UserPortal'; 
import AgentDashboard from './AgentDashboard';
import AdminAnalytics from './AdminAnalytics';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // Check the role from the database and show the correct UI
  switch (user?.role) {
    case 'ADMIN':
      return <AdminAnalytics />;
    case 'AGENT':
      return <AgentDashboard />;
    default:
      // New Google sign-ups default to 'END_USER'
      return <UserPortal />;
  }
};

export default Dashboard;
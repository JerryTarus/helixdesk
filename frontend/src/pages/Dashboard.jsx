import React from 'react';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress } from '@mui/material';

// IMPORTANT: Ensure these files exist in your /pages folder
import AdminAnalytics from './AdminAnalytics';
import AgentDashboard from './AgentDashboard';
import UserPortal from './UserPortal';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // LOGGING: Check your browser console (F12) to see what this prints!
  console.log("Current User Role:", user?.role);

  // Normalizing the role to upper case to prevent 'Admin' vs 'ADMIN' errors
  const role = user?.role?.toUpperCase();

  if (role === 'ADMIN') {
    return <AdminAnalytics />;
  } else if (role === 'AGENT') {
    return <AgentDashboard />;
  } else {
    // Default to User Portal for 'END_USER' or if role is undefined
    return <UserPortal />;
  }
};

export default Dashboard;
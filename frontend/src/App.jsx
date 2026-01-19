// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelixThemeProvider } from './theme/HelixThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import { CircularProgress, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// Page Imports
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // This contains the logic you want
import AuthSuccess from './pages/AuthSuccess';
import Landing from './pages/Landing';
import VerifyOTP from './pages/VerifyOTP';
import SystemLogs from './pages/SystemLogs';
import AgentTicketWorkspace from './pages/AgentTicketWorkspace'; // New

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <HelixThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard /> 
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/logs" 
              element={
                <PrivateRoute>
                  <SystemLogs />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/agent/ticket/:id" 
              element={
                <PrivateRoute>
                  <AgentTicketWorkspace />
                </PrivateRoute>
              } 
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelixThemeProvider>
  );
}

export default App;
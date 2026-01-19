// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelixThemeProvider } from './theme/HelixThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import { CircularProgress, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// Layout Component
import Layout from './components/Layout';

// Page Imports
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthSuccess from './pages/AuthSuccess';
import Landing from './pages/Landing';
import VerifyOTP from './pages/VerifyOTP';
import SystemLogs from './pages/SystemLogs';
import AgentTicketWorkspace from './pages/AgentTicketWorkspace';

// ✅ Robust PrivateRoute with no flash redirects
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. While the app is checking the cookie/session, show loader
  // This prevents the "flash" redirect to /login
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // 2. Only redirect if loading is finished AND there is definitely no user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <HelixThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Routes>
            {/* Public Routes — NOT wrapped in Layout */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            {/* Protected Routes — WRAPPED in Layout */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <PrivateRoute>
                  <Layout>
                    <SystemLogs />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/agent/ticket/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <AgentTicketWorkspace />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelixThemeProvider>
  );
}

export default App;
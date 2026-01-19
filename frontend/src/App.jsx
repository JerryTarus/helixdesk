// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelixThemeProvider } from './theme/HelixThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { CircularProgress, Box } from '@mui/material';
import AuthSuccess from './pages/AuthSuccess';
import Landing from './pages/Landing';
import { Toaster } from 'react-hot-toast';
import VerifyOTP from './pages/VerifyOTP';
import SystemLogs from './pages/SystemLogs';

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
            <Route path="/admin/logs" element={<PrivateRoute><SystemLogs /></PrivateRoute>} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Box p={5}>
                    <h1>Dashboard Coming Next (Role-Based)</h1>
                  </Box>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </HelixThemeProvider>
  );
}

export default App;
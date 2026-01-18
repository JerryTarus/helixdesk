// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelixThemeProvider } from './theme/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import { CircularProgress, Box } from '@mui/material';

// Helper component for private routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress color="secondary" />
    </Box>
  );
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <HelixThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* We will build these next */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Box p={5}><h1>Dashboard Coming Next (Role-Based)</h1></Box>
              </PrivateRoute>
            } />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelixThemeProvider>
  );
}

export default App;
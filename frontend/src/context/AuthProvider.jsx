// frontend/src/context/AuthProvider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const checkAuth = useCallback(async () => {
  try {
    const response = await api.get('/auth/me');
    console.log("Auth Check Success:", response.data); // Add this log
    setUser(response.data);
  } catch (err) {
    console.error("Auth Check Failed:", err.response?.data || err.message); // Add this log
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Avatar, Chip, IconButton, Stack, CircularProgress 
} from '@mui/material';
import { Shield, Person, DeleteForever, Upgrade } from '@mui/icons-material';
import api from '../api/axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      // Create this route in your backend later
      const res = await api.get('/auth/users'); 
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/auth/users/${userId}/role`, { role: newRole });
      fetchUsers(); 
    } catch (err) {
      console.error("Role change failed:", err.response?.data || err.message);
      alert(`Action failed: ${err.response?.data?.message || "Server Error"}`);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} mb={4}>Identity & Access Management</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>USER</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>ROLE</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={u.avatar_url} />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{u.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{u.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip label={u.role} color={u.role === 'ADMIN' ? 'secondary' : 'default'} size="small" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" title="Promote to Agent" onClick={() => handleRoleChange(u.id, 'AGENT')}><Upgrade /></IconButton>
                    <IconButton size="small" color="error"><DeleteForever /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUserManagement;
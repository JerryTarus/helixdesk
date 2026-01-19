import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import api from '../api/axios';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/auth/admin/logs');
        setLogs(res.data);
      } catch (err) { console.error(err); }
    };
    fetchLogs();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={900} mb={4} color="#1E293B">System Audit Logs</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F1F5F9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>EVENT TYPE</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>USER</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>DETAILS</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>TIMESTAMP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell><Typography variant="body2" fontWeight={700}>{log.event_type}</Typography></TableCell>
                  <TableCell>{log.full_name || 'System'}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{log.details}</TableCell>
                  <TableCell>
                    <Chip label={log.status} size="small" 
                      sx={{ bgcolor: log.status === 'SUCCESS' ? '#F0FDF4' : '#FEF2F2', color: log.status === 'SUCCESS' ? '#16A34A' : '#DC2626', fontWeight: 800 }} 
                    />
                  </TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default SystemLogs;
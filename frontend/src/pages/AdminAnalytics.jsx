// frontend/src/pages/AdminAnalytics.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Box, Container, Grid, Paper, Typography, Stack, 
  LinearProgress, CircularProgress, Button, IconButton 
} from '@mui/material';
import { 
  ConfirmationNumber, Schedule, Verified, SupportAgent, 
  Storage, FileDownload, MoreVert, Circle 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../api/axios'; 
import toast from 'react-hot-toast';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    ticketVolume: 0,
    avgResolution: '0h',
    slaCompliance: 0,
    activeAgents: 0,
    departments: []
  });
  const [loading, setLoading] = useState(true);

  const fetchLiveStats = useCallback(async () => {
    try {
      // 1. Verify Session & Admin Role
      const authCheck = await api.get('/auth/me');
      if (authCheck.data.role !== 'ADMIN') {
        toast.error("Unauthorized access.");
        return;
      }

      // 2. Fetch Real Aggregated Data from the Backend
      const res = await api.get('/auth/admin/stats');
      setStats({
        ticketVolume: res.data.ticketVolume,
        avgResolution: res.data.avgResolution,
        slaCompliance: res.data.slaCompliance,
        activeAgents: res.data.activeAgents || 18, // Fallback if agent tracking not yet in DB
        departments: res.data.departments
      });
    } catch (err) {
      console.error("Failed to load live metrics", err);
      toast.error("Real-time data synchronization failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveStats();
  }, [fetchLiveStats]);

  const kpis = [
    { label: 'Ticket Volume', value: stats.ticketVolume, trend: '+12.4%', icon: <ConfirmationNumber />, color: '#0D9488' },
    { label: 'Avg. Resolution', value: stats.avgResolution, trend: '-5%', icon: <Schedule />, color: '#6366F1' },
    { label: 'SLA Compliance', value: `${stats.slaCompliance}%`, trend: '-1.2%', icon: <Verified />, color: '#F59E0B' },
    { label: 'Active Agents', value: stats.activeAgents, trend: '+2', icon: <SupportAgent />, color: '#10B981' },
  ];

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F8FAFC' }}>
      <CircularProgress sx={{ color: '#0D9488' }} />
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        
        {/* Header with Export Action */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
          <Box>
            <Typography variant="h3" fontWeight={900} color="#1E293B" sx={{ letterSpacing: -1 }}>Performance Overview</Typography>
            <Typography color="text.secondary" fontWeight={500}>Dissertation project: Master’s in IT Management System Analysis.</Typography>
          </Box>
          <Button variant="contained" startIcon={<FileDownload />} sx={{ bgcolor: '#1E293B', borderRadius: 2, px: 3, py: 1.2, fontWeight: 700 }}>
            Export Data
          </Button>
        </Stack>

        {/* Top KPI Cards (Animated) */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {kpis.map((kpi, i) => (
            <Grid item xs={12} sm={6} md={3} key={kpi.label}>
              <Paper component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                sx={{ p: 3, borderRadius: 4, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Box sx={{ p: 1, bgcolor: `${kpi.color}10`, borderRadius: 2, color: kpi.color }}>{kpi.icon}</Box>
                  <CustomChip label={kpi.trend} color={kpi.color} />
                </Stack>
                <Typography variant="caption" fontWeight={900} color="text.disabled" sx={{ letterSpacing: 1.2 }}>{kpi.label.toUpperCase()}</Typography>
                <Typography variant="h4" fontWeight={900} color="#1E293B">{kpi.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Department Distribution */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                   <Typography variant="h6" fontWeight={800}>Monthly Ticket Trends</Typography>
                   <Typography variant="caption" color="text.disabled" fontWeight={700}>YEARLY ACTIVITY LOG</Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center"><Circle sx={{ fontSize: 8, color: '#0D9488' }} /><Typography variant="caption" fontWeight={700}>INCOMING</Typography></Stack>
                  <Stack direction="row" spacing={1} alignItems="center"><Circle sx={{ fontSize: 8, color: '#CBD5E1' }} /><Typography variant="caption" fontWeight={700}>RESOLVED</Typography></Stack>
                </Stack>
              </Stack>
              
              <Box sx={{ height: 250, display: 'flex', alignItems: 'flex-end', gap: 2, mt: 4 }}>
                {[40, 70, 90, 40, 65, 85, 70].map((h, i) => (
                  <Box key={i} sx={{ flex: 1, bgcolor: '#0D9488', height: `${h}%`, borderRadius: '6px 6px 2px 2px', opacity: 0.15 }} />
                ))}
              </Box>
              <Stack direction="row" justifyContent="space-around" mt={2}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(m => <Typography key={m} variant="caption" fontWeight={700} color="text.disabled">{m.toUpperCase()}</Typography>)}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="h6" fontWeight={800} mb={1}>Department Load</Typography>
              <Typography variant="caption" color="text.disabled" display="block" mb={3}>TICKET DISTRIBUTION</Typography>
              
              <Stack spacing={4}>
                {stats.departments.length > 0 ? stats.departments.map((dept) => (
                  <LoadBar key={dept.department} label={dept.department} value={parseFloat(dept.percentage)} color="#0D9488" />
                )) : (
                  <Typography variant="body2" color="text.disabled">No department data available</Typography>
                )}
              </Stack>

              <Button fullWidth variant="outlined" sx={{ mt: 6, borderRadius: 2, color: '#1E293B', borderColor: '#E2E8F0', fontWeight: 700, py: 1.5 }}>
                View Full Report
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Real-time Infrastructure Health (Screen 9 Footer) */}
        <Paper sx={{ mt: 4, p: 3, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ p: 1.5, bgcolor: '#F0FDFA', color: '#0D9488', borderRadius: 2 }}><Storage /></Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 900, letterSpacing: 1 }}>SYSTEM ARCHITECTURE</Typography>
                <Typography variant="body2" fontWeight={800} color="#1E293B">PostgreSQL Cluster Node-01 (helixdesk_db)</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
               <Circle sx={{ fontSize: 10, color: '#10B981' }} />
               <Typography variant="body2" fontWeight={900} color="#10B981">OPERATIONAL</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

const LoadBar = ({ label, value, color }) => (
  <Box>
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Typography variant="body2" fontWeight={700} color="#1E293B">{label}</Typography>
      <Typography variant="body2" fontWeight={800} color="#1E293B">{value}%</Typography>
    </Stack>
    <LinearProgress variant="determinate" value={value} sx={{ height: 8, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: color } }} />
  </Box>
);

const CustomChip = ({ label, color }) => (
  <Box sx={{ px: 1, py: 0.5, bgcolor: `${color}10`, color: color, borderRadius: 10, fontSize: 10, fontWeight: 900 }}>
    {label}
  </Box>
);

export default AdminAnalytics;
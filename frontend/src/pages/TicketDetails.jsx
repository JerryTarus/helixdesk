// frontend/src/pages/TicketDetails.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Paper, Typography, TextField, Button, 
  Avatar, Chip, Stack, CircularProgress, Divider 
} from '@mui/material';
import { Send, ArrowBack, AccountCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useAuth } from '../context/useAuth';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Now fully utilized below
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  const loadTicket = useCallback(async (isMounted) => {
    try {
      const res = await api.get(`/tickets/${id}`);
      if (isMounted) setTicket(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      if (isMounted) setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    loadTicket(isMounted);
    return () => { isMounted = false; };
  }, [loadTicket]);

  const handleSend = async () => {
    if (!reply.trim()) return;
    try {
      await api.post(`/tickets/${id}/messages`, { body: reply });
      setReply('');
      loadTicket(true); 
    } catch (err) {
      console.error("Send error", err);
    }
  };

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!ticket) return <Typography sx={{ p: 4 }}>Ticket not found.</Typography>;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        {/* LINTER FIX: Using 'user' variable here */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.8 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountCircle fontSize="small" color="action" />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Session: {user?.full_name} ({user?.role})
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>
            REF: {ticket.ticket_key}
          </Typography>
        </Box>

        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/dashboard')}
          sx={{ mb: 4, fontWeight: 700, color: 'text.secondary' }}
        >
          Back to Dashboard
        </Button>

        <Paper sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h4" fontWeight={900}>{ticket.subject}</Typography>
            <Chip label={ticket.status} color="secondary" sx={{ fontWeight: 900 }} />
          </Stack>
          <Typography variant="body1" color="text.secondary">{ticket.description}</Typography>
        </Paper>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ mb: 4 }}>
          {ticket.messages?.map((msg, index) => (
            <Box 
              key={msg.id} 
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              sx={{ 
                display: 'flex', 
                flexDirection: msg.is_own ? 'row-reverse' : 'row', 
                gap: 2, mb: 3 
              }}
            >
              <Avatar src={msg.sender_avatar} />
              <Paper sx={{ 
                p: 2, 
                borderRadius: 3, 
                bgcolor: msg.is_own ? 'primary.main' : 'background.paper',
                color: msg.is_own ? 'white' : 'text.primary',
                border: msg.is_own ? 'none' : '1px solid',
                borderColor: 'divider',
                boxShadow: 'none'
              }}>
                <Typography variant="body2">{msg.message_body}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Paper sx={{ p: 2, borderRadius: 4, display: 'flex', gap: 2, border: '1px solid', borderColor: 'divider' }}>
          <TextField 
            fullWidth 
            multiline 
            placeholder="Type your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleSend} disabled={!reply.trim()}>
            <Send />
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default TicketDetails;
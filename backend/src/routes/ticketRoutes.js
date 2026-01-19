const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const { 
  createTicket, 
  getMyTickets, 
  getTicketDetails, 
  addMessage 
} = require('../controllers/ticketController');

// Ticket Management
router.post('/', verifyToken, upload.single('attachment'), createTicket);
router.get('/my-tickets', verifyToken, getMyTickets);
router.get('/:id', verifyToken, getTicketDetails);
router.post('/:id/messages', verifyToken, addMessage);

module.exports = router;
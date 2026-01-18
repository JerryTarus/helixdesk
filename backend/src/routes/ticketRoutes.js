const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken, verifyAgent } = require('../middlewares/authMiddleware');

// User Routes
router.post('/', verifyToken, ticketController.createTicket);
router.get('/my-tickets', verifyToken, ticketController.getMyTickets);

// Thread Routes (Screen 6 & 8)
router.get('/:id', verifyToken, ticketController.getTicketDetails);
router.post('/:id/messages', verifyToken, ticketController.addMessage);

module.exports = router;
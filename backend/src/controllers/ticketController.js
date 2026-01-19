const db = require('../config/db');

exports.createTicket = async (req, res) => {
  const { subject, description, priority, department, category } = req.body;
  const requester_id = req.user.id;

  // 1. Get the file path if a file was uploaded
  const attachment_url = req.file ? `/uploads/${req.file.filename}` : null;

  // 2. Generate a unique Ticket Key
  const ticket_key = `TK-${Math.floor(10000 + Math.random() * 90000)}`;

  try {
    // 3. Insert Ticket
    const result = await db.query(
      `INSERT INTO tickets 
      (ticket_key, requester_id, subject, description, priority, department, category, attachment_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [ticket_key, requester_id, subject, description, priority, department, category, attachment_url]
    );

    // 4. Log the event for Admin Analytics
    await db.query(
      `INSERT INTO system_logs (event_type, user_id, status, details) 
       VALUES ('TICKET_CREATED', $1, 'SUCCESS', $2)`,
      [requester_id, `New ticket ${ticket_key} created.`]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CREATE_TICKET_ERROR:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM tickets WHERE requester_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET_MY_TICKETS_ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTicketDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Fetch Ticket details
    const ticketResult = await db.query('SELECT * FROM tickets WHERE id = $1', [id]);
    if (ticketResult.rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });

    // 2. Fetch associated Messages (Thread)
    const messagesResult = await db.query(
      `SELECT tm.*, u.full_name as sender_name, u.avatar_url as sender_avatar 
       FROM ticket_messages tm 
       JOIN users u ON tm.sender_id = u.id 
       WHERE tm.ticket_id = $1 
       ORDER BY tm.created_at ASC`,
      [id]
    );

    const ticket = ticketResult.rows[0];
    // Map 'is_own' flag for the UI bubbles
    ticket.messages = messagesResult.rows.map(msg => ({
      ...msg,
      is_own: msg.sender_id === req.user.id
    }));

    res.json(ticket);
  } catch (err) {
    console.error("GET_DETAILS_ERROR:", err);
    res.status(500).json({ message: 'Error fetching details' });
  }
};

exports.addMessage = async (req, res) => {
  const { id } = req.params;
  const { body, is_internal = false } = req.body;
  const sender_id = req.user.id;

  try {
    await db.query(
      'INSERT INTO ticket_messages (ticket_id, sender_id, message_body, is_internal) VALUES ($1, $2, $3, $4)',
      [id, sender_id, body, is_internal]
    );
    res.status(201).json({ message: 'Message added' });
  } catch (err) {
    console.error("ADD_MESSAGE_ERROR:", err);
    res.status(500).json({ message: 'Error sending message' });
  }
};
const express = require('express');
const router = express.Router();
const { users, borrowings, books } = require('../models');

// GET /users - View the list of all users
router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /users/:id/history - Retrieve a specific user's borrowing history
router.get('/:id/history', (req, res) => {
  const userId = parseInt(req.params.id);
  const userBorrowings = borrowings.filter(b => b.user_id === userId);
  if (userBorrowings.length > 0) {
    res.json(userBorrowings);
  } else {
    res.status(404).json({ error: 'No borrowing history found for this user' });
  }
});

// POST /borrow - Borrow a book
router.post('/borrow', (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) {
    return res.status(400).json({ error: 'user_id and book_id are required' });
  }
  const book = books.find(b => b.id === book_id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (!book.available) {
    return res.status(400).json({ error: 'Book is not available' });
  }
  book.available = false;
  const newBorrowing = {
    id: borrowings.length + 1,
    user_id: parseInt(user_id),
    book_id: parseInt(book_id),
    borrowed_at: new Date(),
    returned_at: null
  };
  borrowings.push(newBorrowing);
  res.status(201).json(newBorrowing);
});

// POST /return - Return a book
router.post('/return', (req, res) => {
  const { user_id, book_id } = req.body;
  if (!user_id || !book_id) {
    return res.status(400).json({ error: 'user_id and book_id are required' });
  }
  const borrowing = borrowings.find(b => b.user_id === parseInt(user_id) && b.book_id === parseInt(book_id) && !b.returned_at);
  if (!borrowing) {
    return res.status(404).json({ error: 'Borrowing record not found' });
  }
  borrowing.returned_at = new Date();
  const book = books.find(b => b.id === borrowing.book_id);
  if (book) {
    book.available = true;
  }
  res.json(borrowing);
});

module.exports = router;

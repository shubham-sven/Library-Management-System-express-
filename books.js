const express = require('express');
const router = express.Router();
const { books } = require('../models');

// GET /books - View the list of all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET /books/:id - Fetch details about a specific book
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

module.exports = router;

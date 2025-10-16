const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Routes
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

app.use('/books', booksRouter);
app.use('/users', usersRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Library API' });
});

// Start server
app.listen(port, () => {
  console.log(`Library API listening at http://localhost:${port}`);
});

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1', available: true },
  { id: 2, title: 'Book 2', author: 'Author 2', available: true },
  { id: 3, title: 'Book 3', author: 'Author 3', available: false }
];

let users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' }
];

let borrowings = [
  { id: 1, user_id: 1, book_id: 3, borrowed_at: new Date(), returned_at: null }
];

module.exports = { books, users, borrowings };

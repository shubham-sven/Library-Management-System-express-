document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadUsers();
    loadBorrowings();
});

function loadBooks() {
    fetch('/books')
        .then(response => response.json())
        .then(books => {
            const tbody = document.getElementById('books-tbody');
            tbody.innerHTML = '';
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td class="${book.available ? 'available' : 'unavailable'}">${book.available ? 'Yes' : 'No'}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading books:', error));
}

function loadUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById('users-tbody');
            tbody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading users:', error));
}

function loadBorrowings() {
    // Since we don't have a direct endpoint for all borrowings, we'll load from models
    // In a real app, you'd have an endpoint like /borrowings
    // For now, we'll simulate by loading user histories
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById('borrowings-tbody');
            tbody.innerHTML = '';
            // Load borrowing history for each user
            const promises = users.map(user =>
                fetch(`/users/${user.id}/history`)
                    .then(response => response.json())
                    .then(history => ({ userId: user.id, history }))
            );

            Promise.all(promises)
                .then(results => {
                    results.forEach(result => {
                        result.history.forEach(borrowing => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${borrowing.id}</td>
                                <td>${borrowing.user_id}</td>
                                <td>${borrowing.book_id}</td>
                                <td>${new Date(borrowing.borrowed_at).toLocaleString()}</td>
                                <td>${borrowing.returned_at ? new Date(borrowing.returned_at).toLocaleString() : 'Not returned'}</td>
                            `;
                            tbody.appendChild(row);
                        });
                    });
                })
                .catch(error => console.error('Error loading borrowings:', error));
        })
        .catch(error => console.error('Error loading users for borrowings:', error));
}

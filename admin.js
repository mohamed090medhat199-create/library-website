// Add new book
document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('add-book-form');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const edition = document.getElementById('edition').value.trim();
            const image = document.getElementById('image').value.trim();
            
            if (!title || !author || !edition || !image) {
                alert('Please fill in all fields.');
                return;
            }
            
            const books = JSON.parse(localStorage.getItem('books')) || [];
            const newId = books.length > 0 ? (books[books.length - 1].id + 1) : 1;
            
            const newBook = {
                id: newId,
                title: title,
                author: author,
                edition: edition,
                image: image,
            };
            
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            
            // Reset form
            addBookForm.reset();
            
            // Refresh books table
            renderBooksTable();
            
            alert('Book added successfully!');
        });
    }
    
    // Render books table on admin page load
    if (window.location.pathname.includes('admin.html')) {
        renderBooksTable();
    }
});

// Render books table
function renderBooksTable() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const tbody = document.querySelector('#books-table tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const tr = document.createElement('tr');

        const tdTitle = document.createElement('td');
        tdTitle.textContent = book.title;
        tr.appendChild(tdTitle);

        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = book.author;
        tr.appendChild(tdAuthor);

        const tdEdition = document.createElement('td');
        tdEdition.textContent = book.edition;
        tr.appendChild(tdEdition);

        const tdActions = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger action-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteBook(book.id));
        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });
}

// Delete book
function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = books.filter(book => book.id !== bookId);
    
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    
    // Refresh books table
    renderBooksTable();
    
    alert('Book deleted successfully!');
}
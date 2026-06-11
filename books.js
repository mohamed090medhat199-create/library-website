// Initialize books if not exists
function initBooks() {
    if (!localStorage.getItem('books')) {
        const defaultBooks = [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                edition: 'First Edition',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            },
            {
                id: 2,
                title: 'Harry Potter and the Philosopher\'s Stone',
                author: 'J.K. Rowling',
                edition: 'First Edition',
                image: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            }
        ];
        
        localStorage.setItem('books', JSON.stringify(defaultBooks));
    }
}

// Get all books
function getAllBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Get featured books (first 6)
function getFeaturedBooks() {
    const allBooks = getAllBooks();
    return allBooks.slice(0, 6);
}

// Render books to a container
function renderBooks(books, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        // Create image safely
        const img = document.createElement('img');
        img.setAttribute('src', book.image);
        img.setAttribute('alt', book.title);
        bookCard.appendChild(img);

        // Create info container
        const infoDiv = document.createElement('div');
        infoDiv.className ='book-info';

        // Title
        const h3 = document.createElement('h3');
        h3.textContent = book.title;
        infoDiv.appendChild(h3);

        // Author
        const pAuthor = document.createElement('p');
        pAuthor.innerHTML = `<strong>Author:</strong> `;
        const authorText = document.createTextNode(book.author);
        pAuthor.appendChild(authorText);
        infoDiv.appendChild(pAuthor);

        // Edition
        const pEdition = document.createElement('p');
        pEdition.innerHTML = `<strong>Edition:</strong> `;
        const editionText = document.createTextNode(book.edition);
        pEdition.appendChild(editionText);
        infoDiv.appendChild(pEdition);

        bookCard.appendChild(infoDiv);
        
        container.appendChild(bookCard);
    });
}

// Initialize books and render on page load
document.addEventListener('DOMContentLoaded', function() {
    initBooks();
    
    if (window.location.pathname.includes('index.html')) {
        renderBooks(getFeaturedBooks(), 'featured-books');
    } else if (window.location.pathname.includes('books.html')) {
        renderBooks(getAllBooks(), 'all-books');
    }
});
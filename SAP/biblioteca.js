let currentUser = null;
let books = [];
let userIdCounter = 1;
let bookIdCounter = 1;

document.getElementById('form-user').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();

  if (name && email) {
    currentUser = {
      id: userIdCounter++,
      name,
      email
    };

    document.getElementById('user-form').style.display = 'none';
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('book-list').style.display = 'block';
  }
});

document.getElementById('form-book').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const genre = document.getElementById('book-genre').value.trim();
  const status = document.getElementById('book-status').value;

  if (title && author && genre) {
    const book = {
      id: bookIdCounter++,
      userId: currentUser.id,
      title,
      author,
      genre,
      status
    };
    books.push(book);
    updateBookLists();
    e.target.reset();
  }
});

function updateBookLists() {
  ['quero ler', 'lendo', 'lido'].forEach(status => {
    const ul = document.querySelector(`#books-${status.replace(' ', '-')}>ul`);
    ul.innerHTML = '';
    books
      .filter(book => book.userId === currentUser.id && book.status === status)
      .forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${book.title}</strong> - ${book.author} (${book.genre})
          <br>
          <select onchange="changeStatus(${book.id}, this.value)">
            <option value="quero ler" ${book.status === 'quero ler' ? 'selected' : ''}>Quero Ler</option>
            <option value="lendo" ${book.status === 'lendo' ? 'selected' : ''}>Lendo</option>
            <option value="lido" ${book.status === 'lido' ? 'selected' : ''}>Lido</option>
          </select>
        `;
        ul.appendChild(li);
      });
  });
}

function changeStatus(bookId, newStatus) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.status = newStatus;
    updateBookLists();
  }
}
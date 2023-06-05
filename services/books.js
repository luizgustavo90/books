const db = require('./db');

function list(params) {
  const criteria = filter(params);
  let query = `SELECT book.id, book.book_name as book, book.book_edition as edition, book.publication_year as year, author.author_name as author 
               FROM book INNER JOIN book_author ON book.id = book_author.book_id INNER JOIN author ON book_author.author_id = author.id 
               WHERE ${criteria.conditions} ORDER BY book.id`

  const result = db.query(query);
  const data = parse(result);

  return {
    data,
    meta: criteria.meta
  }
}

function filter(params) {
  const { book, edition, year, author } = params;
  const meta = {};
  let conditions = '1 = 1'
  
  if (book) {
    conditions += ` AND book.book_name LIKE '%${book}%'`
    meta.book = book
  }

  if (edition) {
    conditions += ` AND book.book_edition = ${edition}`
    meta.edition = edition
  }

  if (year) {
    conditions += ` AND book.publication_year = ${year}`
    meta.year = year
  }

  if (author) {
    // conditions += ` AND author.author_name = '${author}')`
    conditions += ` AND book.id IN (SELECT book_author.book_id FROM author INNER JOIN book_author ON book_author.author_id = author.id WHERE author.author_name = '${author}')`
    meta.author = author
  }

  return {
    conditions,
    meta
  }
}

function parse(result) {
  const books = [...new Map(result.map(row => [row['id'], row]))]
  const data = [];

  for (const [id, book] of books) {
    book.authors = [];
    for (const item of result.filter(item => item.id === id)) {
      book.authors.push(item.author);
    }

    delete (book.author)
    data.push(book);
  }

  return data;
}

function insert(book) {
  validate(book);
  const { name, edition, year, authors } = book;
  const result = db.run('INSERT INTO book (book_name, book_edition, publication_year) VALUES (@name, @edition, @year)', { name, edition, year });

  let message = 'Error in creating book';
  if (result.changes) {
    message = 'Book created successfully';
    for (const author_id of authors) {
      db.run('INSERT INTO book_author (book_id, author_id) VALUES (@book_id, @author_id)', { book_id: result.lastInsertRowid, author_id });
    }
  }

  return { message };
}

function update(id, book) {
  validate(book);
  const { name, edition, year, authors } = book;
  const result = db.run(`UPDATE book SET book_name = @name, book_edition = @edition, publication_year = @year WHERE id = @id`, { id, name, edition, year });

  let message = 'Error in updating book';
  if (result.changes) {
    message = 'Book updated successfully';
    db.run('DELETE FROM book_author WHERE book_id = @id', { id });
    for (const author_id of authors) {
      db.run('INSERT INTO book_author (book_id, author_id) VALUES (@book_id, @author_id)', { book_id: id, author_id });
    }
  }

  return { message };
}

function validate(book) {
  let messages = [];

  if (!book) {
    messages.push('No book is provided');
  }

  if (!book.name) {
    messages.push('Name is empty');
  }

  if (!book.edition) {
    messages.push('Edition is empty');
  }

  if (!book.year) {
    messages.push('Publication year is empty');
  }

  if (!book.authors || book.authors.length < 1) {
    messages.push('Authors is empty');
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function remove(id) {
  let message = 'Error on deleting book';
  const authors = db.run('DELETE FROM book_author WHERE book_id = @id', { id });

  if (authors.changes) {
    const book = db.run('DELETE FROM book WHERE id = @id', { id });
    if (book.changes) {
      message = 'Book deleted successfully';
    }
  }

  return { message };
}

module.exports = {
  list,
  insert,
  update,
  delete: remove
}

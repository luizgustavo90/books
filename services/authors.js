const db = require('./db');

function list() {
  const query = `SELECT author.id, author.author_name as author FROM author ORDER BY author.id`
  const data = db.query(query);

  return {
    data
  }
}

function upload(authors) {
  validate(authors);
  authors.shift();

  let message = 'Authors uploaded successfully';
  for (const author of authors) {
    const inserted = insert(author);
    if (inserted !== 'Author created successfully') {
      message = inserted
    }
  }

  return { message };
}

function validate(authors) {
  const messages = []

  if (!authors) {
    messages.push('No authors is provided');
  }

  if (!authors[0].startsWith('author')) {
    messages.push('File without author header ' + authors[0]);
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function insert(author) {
  if (!author) {
    const error = new Error('No author is provided');
    error.statusCode = 400;

    throw error;
  }

  const name = author.replace(/(\r\n|\n|\r)/gm, "")
  const result = db.run('INSERT INTO author (author_name) VALUES (@name)', { name });

  let message = 'Error in creating author';
  if (result.changes) {
    message = 'Author created successfully';
  }

  return { message };
}

module.exports = {
  list,
  insert,
  upload
}

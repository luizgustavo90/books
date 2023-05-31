CREATE TABLE book_author (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER NOT NULL REFERENCES book(id),
  author_id INTEGER NOT NULL REFERENCES author(id)
);

CREATE UNIQUE INDEX ix_book_author ON book_author(book_id, author_id);

PRAGMA foreign_keys = ON;

INSERT INTO book_author(book_id, author_id) VALUES (1, 1);
INSERT INTO book_author(book_id, author_id) VALUES (1, 2);

INSERT INTO book_author(book_id, author_id) VALUES (2, 1);
INSERT INTO book_author(book_id, author_id) VALUES (2, 2);
INSERT INTO book_author(book_id, author_id) VALUES (2, 3);

/*
SELECT      book_author.id, book_author.book_id, book.book_name as book, book.book_edition as edition, book.publication_year as year, book_author.author_id, author.author_name as author
FROM        book_author
INNER JOIN  book ON book_author.book_id = book.id
INNER JOIN  author ON book_author.author_id = author.id;

SELECT      book_author.id, book_author.book_id, book.book_name as book, book.book_edition as edition, book.publication_year as year, book_author.author_id, author.author_name as author
FROM        book_author
INNER JOIN  book ON book_author.book_id = book.id
INNER JOIN  author ON book_author.author_id = author.id
WHERE       book_author.id = 1;

SELECT      book_author.id, book_author.book_id, book.book_name as book, book.book_edition as edition, book.publication_year as year, book_author.author_id, author.author_name as author
FROM        book_author
INNER JOIN  book ON book_author.book_id = book.id
INNER JOIN  author ON book_author.author_id = author.id
WHERE       book_author.book_id = 1;

SELECT      book_author.id, book_author.book_id, book.book_name as book, book.book_edition as edition, book.publication_year as year, book_author.author_id, author.author_name as author
FROM        book_author
INNER JOIN  book ON book_author.book_id = book.id
INNER JOIN  author ON book_author.author_id = author.id
WHERE       book_author.book_id = 2;
*/

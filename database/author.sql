CREATE TABLE author (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO author(author_name) VALUES ('Luiz Gustavo Souza');
INSERT INTO author(author_name)  VALUES ('Marco Almeida');
INSERT INTO author(author_name)  VALUES ('Beatriz Nascimento');
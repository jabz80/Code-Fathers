DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username varchar(30) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY (user_id)

);


CREATE TABLE notes (
    note_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    note VARCHAR(1000) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    PRIMARY KEY (note_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO users (username, password, name) VALUES
('Username 1', 'Password 1', 'Name 1'),
('Username 2', 'Password 2', 'Name 2'),
('Username 3', 'Password 3', 'Name 3'),
('Username 4', 'Password 4', 'Name 4'),
('Username 5', 'Password 5', 'Name 5');



INSERT INTO notes (user_id, title, note, created_at, updated_at) VALUES 
('1', 'Title 1', 'This is the first entry', 'Mon Aug 31 2020', 'Mon Aug 31 2020'),
  ('2', 'Title 2', 'This is the second entry', 'Mon Aug 31 2020', 'Mon Aug 31 2020'),
  ('3', 'Title 3', 'This is the third entry', 'Mon Aug 31 2020', 'Mon Aug 31 2020'),
  ('4', 'Title 4', 'This is the fourth entry', 'Mon Aug 31 2020', 'Mon Aug 31 2020'),
  ('5', 'Title 5', 'This is the fifth entry', 'Mon Aug 31 2020', 'Mon Aug 31 2020');

DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS Users;

SET TIME ZONE 'Europe/London';


CREATE TABLE Users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE Notes (
    note_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    context VARCHAR(10000),
    created_at DATE,
    updated_at DATE,
    PRIMARY KEY(note_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tasks (
    task_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    task_title VARCHAR(50) NOT NULL,
    task_description VARCHAR(10000),
    task_date DATE,
    PRIMARY KEY(task_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Insert data into Users table with 30 records
INSERT INTO Users (username, password, name)
VALUES
    ('user1', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'John Doe'),
    ('user2', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jane Smith'),
    ('user3', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Alice Johnson'),
    ('user4', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Bob Brown'),
    ('user5', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Eva White'),
    ('user6', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'David Lee'),
    ('user7', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Grace Adams'),
    ('user8', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Frank Wilson'),
    ('user9', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Olivia Davis'),
    ('user10', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'William Taylor'),
    ('user11', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Sophia Thomas'),
    ('user12', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'James Harris'),
    ('user13', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Linda Lewis'),
    ('user14', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Michael King'),
    ('user15', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Sarah Martinez'),
    ('user16', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Robert Clark'),
    ('user17', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Elizabeth Hall'),
    ('user18', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Joseph Young'),
    ('user19', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Mary Adams'),
    ('user20', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'John Turner'),
    ('user21', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Catherine Lewis'),
    ('user22', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Daniel Moore'),
    ('user23', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Laura Mitchell'),
    ('user24', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Christopher Allen'),
    ('user25', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Patricia Wright'),
    ('user26', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Matthew Walker'),
    ('user27', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jennifer White'),
    ('user28', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'William Martin'),
    ('user29', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jessica Robinson'),
    ('user30', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Richard Green'),
    ('user', '$2b$10$gFWE8CNP/t2mlonOC34aA.f7Gr5bi.ZG4tB6hlnRmuCCkyr9k7wIC', 'username is user');;

-- Insert data into Notes table with 30 records
INSERT INTO Notes (user_id, title, context, created_at, updated_at)
VALUES
    (31, 'Note 1', 'This is the content of Note 1', '2023-10-30', '2023-10-30'),
    (1, 'Note 2', 'This is the content of Note 2', '2023-10-29', '2023-10-29'),
    (1, 'Note 3', 'This is the content of Note 3', '2023-10-28', '2023-10-28'),
    (2, 'Note 4', 'This is the content of Note 4', '2023-10-27', '2023-10-27'),
    (2, 'Note 5', 'This is the content of Note 5', '2023-10-26', '2023-10-26'),
    (31, 'Note 6', 'This is the content of Note 6', '2023-10-25', '2023-10-25'),
    (3, 'Note 7', 'This is the content of Note 7', '2023-10-24', '2023-10-24'),
    (3, 'Note 8', 'This is the content of Note 8', '2023-10-23', '2023-10-23'),
    (3, 'Note 9', 'This is the content of Note 9', '2023-10-22', '2023-10-22'),
    (31, 'Note 10', 'This is the content of Note 10', '2023-10-21', '2023-10-21'),
    (4, 'Note 11', 'This is the content of Note 11', '2023-10-20', '2023-10-20'),
    (4, 'Note 12', 'This is the content of Note 12', '2023-10-19', '2023-10-19'),
    (31, 'Note 13', 'This is the content of Note 13', '2023-10-18', '2023-10-18'),
    (31, 'Note 14', 'This is the content of Note 14', '2023-10-17', '2023-10-17'),
    (5, 'Note 15', 'This is the content of Note 15', '2023-10-16', '2023-10-16'),
    (6, 'Note 16', 'This is the content of Note 16', '2023-10-15', '2023-10-15'),
    (6, 'Note 17', 'This is the content of Note 17', '2023-10-14', '2023-10-14'),
    (6, 'Note 18', 'This is the content of Note 18', '2023-10-13', '2023-10-13'),
    (7, 'Note 19', 'This is the content of Note 19', '2023-10-12', '2023-10-12'),
    (7, 'Note 20', 'This is the content of Note 20', '2023-10-11', '2023-10-11'),
    (7, 'Note 21', 'This is the content of Note 21', '2023-10-10', '2023-10-10'),
    (8, 'Note 22', 'This is the content of Note 22', '2023-10-09', '2023-10-09'),
    (8, 'Note 23', 'This is the content of Note 23', '2023-10-08', '2023-10-08'),
    (8, 'Note 24', 'This is the content of Note 24', '2023-10-07', '2023-10-07'),
    (9, 'Note 25', 'This is the content of Note 25', '2023-10-06', '2023-10-06'),
    (9, 'Note 26', 'This is the content of Note 26', '2023-10-05', '2023-10-05'),
    (9, 'Note 27', 'This is the content of Note 27', '2023-10-04', '2023-10-04'),
    (10, 'Note 28', 'This is the content of Note 28', '2023-10-03', '2023-10-03'),
    (10, 'Note 29', 'This is the content of Note 29', '2023-10-02', '2023-10-02'),
    (10, 'Note 30', 'This is the content of Note 30', '2023-10-01', '2023-10-01');


-- Insert data into Tasks table with 30 records
INSERT INTO Tasks (user_id, task_title, task_description, task_date)
VALUES
    (1, 'Task 1', 'Description for Task 1', '2023-11-15'),
    (1, 'Task 2', 'Description for Task 2', '2023-11-20'),
    (1, 'Task 3', 'Description for Task 3', '2023-11-25'),
    (2, 'Task 4', 'Description for Task 4', '2023-11-30'),
    (2, 'Task 5', 'Description for Task 5', '2023-12-05'),
    (2, 'Task 6', 'Description for Task 6', '2023-12-10'),
    (3, 'Task 7', 'Description for Task 7', '2023-12-15'),
    (3, 'Task 8', 'Description for Task 8', '2023-12-20'),
    (3, 'Task 9', 'Description for Task 9', '2023-12-25'),
    (4, 'Task 10', 'Description for Task 10', '2023-12-30'),
    (4, 'Task 11', 'Description for Task 11', '2024-01-05'),
    (4, 'Task 12', 'Description for Task 12', '2024-01-10'),
    (5, 'Task 13', 'Description for Task 13', '2024-01-15'),
    (5, 'Task 14', 'Description for Task 14', '2024-01-20'),
    (5, 'Task 15', 'Description for Task 15', '2024-01-25'),
    (6, 'Task 16', 'Description for Task 16', '2024-01-30'),
    (6, 'Task 17', 'Description for Task 17', '2024-02-05'),
    (6, 'Task 18', 'Description for Task 18', '2024-02-10'),
    (7, 'Task 19', 'Description for Task 19', '2024-02-15'),
    (7, 'Task 20', 'Description for Task 20', '2024-02-20'),
    (7, 'Task 21', 'Description for Task 21', '2024-02-25'),
    (8, 'Task 22', 'Description for Task 22', '2024-03-01'),
    (8, 'Task 23', 'Description for Task 23', '2024-03-06'),
    (8, 'Task 24', 'Description for Task 24', '2024-03-11'),
    (9, 'Task 25', 'Description for Task 25', '2024-03-16'),
    (9, 'Task 26', 'Description for Task 26', '2024-03-21'),
    (9, 'Task 27', 'Description for Task 27', '2024-03-26'),
    (10, 'Task 28', 'Description for Task 28', '2024-03-31'),
    (10, 'Task 29', 'Description for Task 29', '2024-04-05'),
    (10, 'Task 30', 'Description for Task 30', '2024-04-10');


set foreign_key_checks = 0;
DROP TABLE IF EXISTS User_Events;
DROP TABLE IF EXISTS User_Problem;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Municipality;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Status;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Priority;
DROP TABLE IF EXISTS Problem;

CREATE TABLE Municipality (
    municipality VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Location (
    location_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(50) NOT NULL,
    municipality_fk VARCHAR(30)
);

CREATE TABLE Status (
    status VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Problem (
    problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    problem_description VARCHAR(300) NOT NULL,
    img_user VARCHAR(300),
    img_entrepeneur VARCHAR(300),
    date_made DATETIME DEFAULT NOW(),
    last_edited DATETIME,
    date_finished DATETIME,
    status_fk VARCHAR(30),
    user_fk INTEGER,
    location_fk INTEGER
);

CREATE TABLE Priority(
    priority INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE Users (
    user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    auz_url VARCHAR(100) NOT NULL,
    priority_fk INTEGER NOT NULL,
    problem_fk INTEGER,
    event_fk INTEGER
);

CREATE TABLE User_Problem (
    user_problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_fk INTEGER,
    problem_fk INTEGER
);

CREATE TABLE Events(
    event_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_descpription VARCHAR(500),
    date_starting DATETIME,
    date_ending DATETIME,
    user_fk INTEGER,
    location_fk INTEGER
);

CREATE TABLE User_Events(
    user_event_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_fk INTEGER,
    event_fk INTEGER
);


ALTER TABLE Location
ADD FOREIGN KEY(municipality_fk) REFERENCES Municipality(municipality);

ALTER TABLE Problem
ADD FOREIGN KEY(status_fk) REFERENCES Status(status),
ADD FOREIGN KEY(user_fk) REFERENCES Users(user_id),
ADD FOREIGN KEY(location_fk) REFERENCES Location(location_id);

ALTER TABLE Users
ADD FOREIGN KEY(priority_fk)REFERENCES Priority(priority),
ADD FOREIGN KEY(problem_fk) REFERENCES Problem(problem_id),
ADD FOREIGN KEY(event_fk) REFERENCES Events(event_id);

ALTER TABLE User_Problem
ADD FOREIGN KEY(problem_fk) REFERENCES Problem(problem_id),
ADD FOREIGN KEY(user_fk) REFERENCES Users(user_id);

ALTER TABLE Events
ADD FOREIGN KEY(location_fk) REFERENCES Location(location_id),
ADD FOREIGN KEY(user_fk) REFERENCES Users(user_id);

ALTER TABLE User_Events
ADD FOREIGN KEY(user_fk) REFERENCES Users(user_id),
ADD FOREIGN KEY(event_fk) REFERENCES Events(event_id);

set foreign_key_checks = 1;


















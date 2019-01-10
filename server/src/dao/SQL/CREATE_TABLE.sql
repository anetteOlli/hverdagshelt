set foreign_key_checks = 0;
DROP TABLE IF EXISTS user_event;
DROP TABLE IF EXISTS user_problem;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS municipality;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS priority;
DROP TABLE IF EXISTS problem;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS county;

CREATE TABLE county(
    name VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE municipality(
    municipality VARCHAR(255) NOT NULL,
    county varchar(255) NOT NULL REFERENCES county(name),
    PRIMARY KEY (municipality,county)
);

CREATE TABLE location (
    location_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(50) NOT NULL,
    municipality_fk VARCHAR(30)
);

CREATE TABLE status (
    status VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE category(
  category VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE problem (
    problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    problem_description VARCHAR(300) NOT NULL,
    descripton_entrepreneur VARCHAR(300),
    img_user VARCHAR(300),
    img_entrepreneur VARCHAR(300),
    date_made DATETIME DEFAULT NOW(),
    last_edited DATETIME,
    date_finished DATETIME,
    category_fk VARCHAR(50),
    status_fk VARCHAR(30),
    user_fk INTEGER,
    entrepreneur_fk INTEGER,
    location_fk INTEGER
);

CREATE TABLE priority(
    priority INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE user (
    user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    auz_url VARCHAR(100) NOT NULL,
    priority_fk INTEGER NOT NULL,
    problem_fk INTEGER,
    event_fk INTEGER
);

CREATE TABLE user_problem (
    user_problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_fk INTEGER,
    problem_fk INTEGER
);

CREATE TABLE event(
    event_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_description VARCHAR(500),
    date_starting DATETIME,
    date_ending DATETIME,
    status_fk VARCHAR(30),
    category_fk VARCHAR(30),
    user_fk INTEGER,
    location_fk INTEGER
);

CREATE TABLE user_event(
    user_event_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_fk INTEGER,
    event_fk INTEGER
);


ALTER TABLE location
ADD FOREIGN KEY(municipality_fk) REFERENCES municipality(municipality);

ALTER TABLE problem
ADD FOREIGN KEY(status_fk) REFERENCES status(status),
ADD FOREIGN KEY(user_fk) REFERENCES user(user_id),
ADD FOREIGN KEY(location_fk) REFERENCES location(location_id),
ADD FOREIGN KEY(category_fk) REFERENCES category(category),
ADD FOREIGN KEY(entrepreneur_fk) REFERENCES user(user_id);

ALTER TABLE user
ADD FOREIGN KEY(priority_fk)REFERENCES priority(priority),
ADD FOREIGN KEY(problem_fk) REFERENCES problem(problem_id),
ADD FOREIGN KEY(event_fk) REFERENCES event(event_id);

ALTER TABLE user_problem
ADD FOREIGN KEY(problem_fk) REFERENCES problem(problem_id),
ADD FOREIGN KEY(user_fk) REFERENCES users(user_id);

ALTER TABLE event
ADD FOREIGN KEY(location_fk) REFERENCES location(location_id),
ADD FOREIGN KEY(user_fk) REFERENCES users(user_id),
ADD FOREIGN KEY(status_fk) REFERENCES status(status),
ADD FOREIGN KEY(category_fk) REFERENCES category(category);

ALTER TABLE user_event
ADD FOREIGN KEY(user_fk) REFERENCES user(user_id),
ADD FOREIGN KEY(event_fk) REFERENCES event(event_id);

ALTER TABLE municipality
ADD FOREIGN KEY(county) REFERENCES county(name);

set foreign_key_checks = 1;


















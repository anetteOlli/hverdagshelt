set foreign_key_checks = 0;
DROP TABLE IF EXISTS user_event;
DROP TABLE IF EXISTS user_problem;
DROP TABLE IF EXISTS entrepreneur_municipality;
DROP TABLE IF EXISTS entrepreneur_category;
DROP TABLE IF EXISTS municipality;
DROP TABLE IF EXISTS entrepreneur;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS priority;
DROP TABLE IF EXISTS problem;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS county;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS street;
set foreign_key_checks = 1;

CREATE TABLE county (
  name VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE municipality (
  municipality VARCHAR(255) NOT NULL,
  county varchar(255) NOT NULL REFERENCES county(name),
  PRIMARY KEY (municipality,county)
);

CREATE TABLE city (
  city_name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE street (
  street_name VARCHAR(30) PRIMARY KEY
);


CREATE TABLE status (
  status VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE category (
  category VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE problem (
  problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  problem_title VARCHAR(50) NOT NULL,
  problem_description VARCHAR(300) NOT NULL,
  problem_locked TINYINT(1) DEFAULT 0,
  description_entrepreneur VARCHAR(300),
  img_user VARCHAR(300),
  img_entrepreneur VARCHAR(300),
  date_made DATETIME,
  last_edited DATETIME ,
  date_finished DATETIME,
  category VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT "Unchecked",
  user_id INTEGER NOT NULL,
  entrepreneur_id INTEGER,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  support INT DEFAULT 0,
  municipality VARCHAR(30) NOT NULL,
  county VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  street VARCHAR(30) NOT NULL
);

CREATE TABLE priority (
  power VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE user (
  user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created DATETIME NOT NULL,
  municipality VARCHAR(30) NOT NULL,
  county VARCHAR(30) NOT NULL,
  priority VARCHAR(30) NOT NULL DEFAULT "Standard",
  active TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE user_problem (
  user_problem_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER,
  problem_id INTEGER
);

CREATE TABLE event (
  event_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event_name VARCHAR(100) NOT NULL,
  event_description VARCHAR(500),
  event_img VARCHAR(300),
  date_starting DATETIME,
  date_ending DATETIME,
  status VARCHAR(30) DEFAULT "Unchecked",
  municipality VARCHAR(30),
  county VARCHAR(30),
  city VARCHAR(30),
  street VARCHAR(30),
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);

CREATE TABLE user_event (
  user_event_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL
);


CREATE TABLE entrepreneur (
    entrepreneur_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    org_nr VARCHAR(45) NOT NULL UNIQUE,
    user_id INT NOT NULL
);

CREATE TABLE entrepreneur_municipality (
   ent_muni INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   entrepreneur_id INT NOT NULL,
   municipality VARCHAR(30) NOT NULL,
   county VARCHAR(30) NOT NULL
);

CREATE TABLE entrepreneur_category (
   ent_cat INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   entrepreneur_id INT NOT NULL,
   category VARCHAR(30) NOT NULL
);


ALTER TABLE problem
  ADD FOREIGN KEY (status) REFERENCES status(status),
  ADD FOREIGN KEY (user_id) REFERENCES user(user_id),
  ADD FOREIGN KEY (municipality, county) REFERENCES municipality(municipality,county),
  ADD FOREIGN KEY (city) REFERENCES city(city_name),
  ADD FOREIGN KEY (street) REFERENCES street(street_name),
  ADD FOREIGN KEY (category) REFERENCES category(category),
  ADD FOREIGN KEY (entrepreneur_id) REFERENCES entrepreneur(entrepreneur_id);

ALTER TABLE user
  ADD FOREIGN KEY (priority) REFERENCES priority(power),
  ADD FOREIGN KEY (municipality,county) REFERENCES municipality(municipality,county);

ALTER TABLE user_problem
  ADD FOREIGN KEY (problem_id) REFERENCES problem(problem_id),
  ADD FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE event
  ADD FOREIGN KEY (municipality, county) REFERENCES municipality(municipality,county),
  ADD FOREIGN KEY (city) REFERENCES city(city_name),
  ADD FOREIGN KEY (street) REFERENCES street(street_name),
  ADD FOREIGN KEY (status) REFERENCES status(status);

ALTER TABLE user_event
  ADD FOREIGN KEY (user_id) REFERENCES user(user_id),
  ADD FOREIGN KEY (event_id) REFERENCES event(event_id);

ALTER TABLE municipality ADD FOREIGN KEY (county) REFERENCES county(name);

ALTER TABLE entrepreneur
  ADD FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE entrepreneur_municipality
  ADD FOREIGN KEY (entrepreneur_id) REFERENCES entrepreneur(entrepreneur_id),
  ADD FOREIGN KEY (municipality,county) REFERENCES municipality(municipality,county);

ALTER TABLE entrepreneur_category
  ADD FOREIGN KEY (entrepreneur_id) REFERENCES entrepreneur(entrepreneur_id),
  ADD FOREIGN KEY (category) REFERENCES category(category);

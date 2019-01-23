INSERT INTO status VALUE ('Upcoming');
INSERT INTO status VALUE ('Ongoing');
INSERT INTO status VALUE ('Archived');
INSERT INTO priority VALUE (5);
INSERT INTO user (email, password, auz_url, city) VALUES('test@test.test', 'ok', 'test', 5);
INSERT INTO category VALUE ('Testing');

UPDATE problem SET problem_description = 'Han vant hele driten' WHERE problem_id = 27;

UPDATE user SET city = 'Administrator' WHERE user_id = 15;


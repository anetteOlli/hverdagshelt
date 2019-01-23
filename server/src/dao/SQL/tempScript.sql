INSERT INTO status VALUE ('Upcoming');
INSERT INTO status VALUE ('Ongoing');
INSERT INTO status VALUE ('Archived');
INSERT INTO priority VALUE (5);
INSERT INTO user (email, password, auz_url, priority_fk) VALUES('test@test.test', 'ok', 'test', 5);
INSERT INTO category VALUE ('Testing');

UPDATE problem SET problem_description = 'Han vant hele driten' WHERE problem_id = 27;

UPDATE user SET priority_fk = 'Administrator' WHERE user_id = 15;

INSERT INTO category VALUE ('water machine broke')

INSERT INTO problem (problem_title, problem_description, date_made, category_fk, status_fk, user_fk, latitude, longitude, municipality_fk, county_fk, city_fk, street_fk)
VALUES ('test1', 'testing', '2019-01-02 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-03 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-03 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-03 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-01 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-03 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-02 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-03 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-05 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-05 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-05 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-09 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-09 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-15 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-15 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-15 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-15 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-26 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-06 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-26 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-23 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test1', 'testing', '2019-01-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien');




 /*
       ('test2', 'testing', '2019-03-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test3', 'testing', '2019-04-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test4', 'testing', '2019-05-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test5', 'testing', '2019-06-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test6', 'testing', '2019-07-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test7', 'testing', '2019-08-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test8', 'testing', '2019-09-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test9', 'testing', '2019-10-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test11', 'testing', '2019-11-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test12', 'testing', '2018-01-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test12', 'testing', '2018-02-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test12', 'testing', '2018-03-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test23', 'testing', '2018-04-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test34', 'testing', '2018-05-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test45', 'testing', '2018-06-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test56', 'testing', '2018-07-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test67', 'testing', '2018-08-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test78', 'testing', '2018-09-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test89', 'testing', '2018-10-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test90', 'testing', '2018-11-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test123', 'testing', '2017-01-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test234', 'testing', '2017-02-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test345', 'testing', '2017-03-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('test54', 'testing', '2017-04-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien'),
       ('tes65t', 'testing', '2017-05-18 14:30:45', 'Tree in road', 'inProgress', 1, 69.640726, 18.931592, 'Tromsø', 'Troms', 'Tromsø', 'Kjeldeveien');
*/
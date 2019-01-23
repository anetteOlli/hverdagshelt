INSERT INTO county VALUES ('Trøndelag');
INSERT INTO county VALUES ('Oppland');
INSERT INTO county VALUES ('Oslo');
INSERT INTO county VALUES ('Troms');

INSERT INTO municipality(municipality, county) VALUES('Oslo', 'Oslo');
INSERT INTO municipality(municipality, county) VALUES('Nord-Fron', 'Oppland');
INSERT INTO municipality(municipality, county) VALUES('Tromsø', 'Troms');
INSERT INTO municipality(municipality, county) VALUES('Trondheim', 'Trøndelag');



INSERT INTO category VALUES('Hole in road');
INSERT INTO category VALUES('Tree in road');
INSERT INTO category VALUES('Snowplow');
INSERT INTO category VALUES('Testing');

INSERT INTO city VALUES('Trondheim');
INSERT INTO city VALUES('Vinstra');
INSERT INTO city VALUES('Tromsø');
INSERT INTO city VALUES('Oslo');

INSERT INTO street VALUES('Trondheimsveien');
INSERT INTO street VALUES('Kjeldeveien');
INSERT INTO street VALUES('Klostergata');
INSERT INTO street VALUES('Sverresgate');
INSERT INTO street VALUES('Mellomveien');
INSERT INTO street VALUES('Bispegata');


INSERT INTO status VALUES ('Unchecked');
INSERT INTO status VALUES ('InProgress');
INSERT INTO status VALUES ('Finished');



INSERT INTO priority VALUES ("Standard");
INSERT INTO priority VALUES ("Entrepreneur");
INSERT INTO priority VALUES ("Municipality");
INSERT INTO priority VALUES ("Administrator");


INSERT INTO user(email, password, municipality, county ,priority, created, active) VALUES('user@user.user', 'ok',"Trondheim", "Trøndelag" ,"Standard", NOW(), 0);
INSERT INTO user(email, password, municipality, county ,priority, created, active) VALUES('koma@koma.koma', 'ok',"Trondheim", "Trøndelag" ,"Municipality", NOW(), 1);
INSERT INTO user(email, password, municipality, county ,priority, created, active) VALUES('entr@entr.entr', 'ok',"Trondheim", "Trøndelag" ,"Entrepreneur", NOW(), 1);
INSERT INTO user(email, password, municipality, county ,priority, created, active) VALUES('admin@admin.admin', 'ok', "Trondheim", "Trøndelag" ,"Administrator", NOW(), 1);

INSERT INTO entrepreneur(business_name, org_nr, user_id) VALUES("Arbeidsjøinn", "01", 4);
INSERT INTO entrepreneur(business_name, org_nr, user_id) VALUES("Arbeidsjøinn", "045", 4);
INSERT INTO entrepreneur(business_name, org_nr, user_id) VALUES("Arbeidsjøinn", "033", 4);

INSERT INTO entrepreneur_municipality(entrepreneur_id, municipality, county) VALUES(1,"Oslo", "Oslo");
INSERT INTO entrepreneur_municipality(entrepreneur_id, municipality, county) VALUES(1,"Tromsø", "Troms");

INSERT INTO entrepreneur_category(entrepreneur_id, category) VALUES(1,'Tree in road');
INSERT INTO entrepreneur_category(entrepreneur_id, category) VALUES(1,'Snowplow');

INSERT INTO problem(problem_title, problem_description, problem_locked, img_user,  category, status, user_id, latitude, longitude, county, municipality, city, street, date_made)
VALUES("Erlend tried his best", "A big hole has been found in the rear of Erlend", FALSE, "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5", "Snowplow", "Unchecked", 1, 63.422724, 10.395582 ,"Trøndelag", "Trondheim", "Trondheim", "Klostergata", NOW());

INSERT INTO problem(problem_title, problem_description, problem_locked, img_user,  category, status, user_id, latitude, longitude, county, municipality, city, street, date_made)
VALUES("Try", "Try try, much try - why no work? try try, so much try - hopw it will work...", FALSE, "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5", "Snowplow", "Unchecked", 1, 63.422724, 10.395582 ,"Trøndelag", "Trondheim", "Trondheim", "Klostergata", NOW());

INSERT INTO problem(problem_title, problem_description, problem_locked, img_user,  category, status, user_id, latitude, longitude, county, municipality, city, street, date_made)
VALUES("Snorres big job", "I've done a oopsie", FALSE, "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5", "Tree in road", "Unchecked", 1, 61.596816, 9.769004, "Oppland", "Nord-Fron", "Vinstra", "Kjeldeveien", NOW());

INSERT INTO problem(problem_title, problem_description, problem_locked, img_user,  category, status, user_id, entrepreneur_id, latitude, longitude, county, municipality, city, street,date_made)
VALUES("Lars is best", "Gloria borger is the best news reporter", FALSE, "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5", "Tree in road", "InProgress", 1, 3 ,69.640726, 18.931592, "Troms", "Tromsø", "Tromsø", "Kjeldeveien", NOW());

INSERT INTO event(event_name, event_description, event_img, date_starting, date_ending, status, municipality, county, city, street, latitude, longitude)
VALUES("SNORRES FORTNITE DANSEKURS", "HAR DU LYST TIL Å BLI DEN KULESTE PÅ DANSEGOLVET?!?! NÅ ER MULIGHETEN DIN HER. SNORRES BRAND NEW AND FRESH DANSE KURS SKAL STARTE OPP", "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/33335219_1930565946955617_4926743241346252800_o.jpg?_nc_cat=102&_nc_ht=scontent-arn2-1.xx&oh=4045e3465ad844be3be2fa56feb0e2e0&oe=5CFEFA28", "2019-01-18 10:30:00", "2019-04-20 23:59:59", "InProgress", "Trondheim", "Trøndelag", "Trondheim", "Klostergata", 63.422724, 10.395582);

INSERT INTO event(event_name, event_description, event_img, date_starting, date_ending, status, municipality, county, city, street, latitude, longitude)
VALUES("Simen's skogtur", "Gutten skal på tur og nå er det din mulighet å bli med. Nei, dette har ingenting med skogtur filmen.", "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/13892175_1012382942215365_2249318160119281179_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=a2e31243c4bf6a7871257b3421ceb301&oe=5CBF5E34", "2019-01-18 10:30:00", "2019-01-20 23:59:59", "InProgress", "Trondheim", "Trøndelag", "Trondheim", "Bispegata", 63.427619, 10.395435);

INSERT INTO event(event_name, event_description, event_img, date_starting, date_ending, status, municipality, county, city, street, latitude, longitude)
VALUES("ESA MØTER OPP PÅ BYFEST!!", "ÅRET ER NYTT OG DET ER PÅTIDE MED EN NY BYFEST! I år har vi gleden av å med dele at ESA kommer! Fantastisk er det ikke? Elisabeth, Sindre og Anette er klare for å skape fart,spenning og kjærleik med sin helt utrolige folke musikk. Sindre på banjo, Elisabeth på munnspill og Anette på munnharpe. To ord: GLED DERE", "https://i.pinimg.com/originals/8d/4e/4e/8d4e4ea8012c4c8dd6a9a4ba7f746422.jpg", "2019-01-18 10:30:00", "2019-01-20 23:59:59", "InProgress", "Nord-Fron", "Oppland",  "Vinstra", "Kjeldeveien", 61.593929, 9.751860);

INSERT INTO user_problem(user_id, problem_id) VALUES (1,1);
INSERT INTO user_problem(user_id, problem_id) VALUES (2,1);
INSERT INTO user_problem(user_id, problem_id) VALUES (4,1);
INSERT INTO user_problem(user_id, problem_id) VALUES (1,2);
INSERT INTO user_problem(user_id, problem_id) VALUES (2,2);

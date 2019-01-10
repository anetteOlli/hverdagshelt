INSERT INTO priority VALUE (5);
INSERT INTO user (email, password, auz_url, priority_fk) VALUES('test@test.test', 'ok', 'test', 5);
INSERT INTO location(location_name) VALUE ('Torget');
INSERT INTO category VALUE ('Testing');

ALTER TABLE event
  CHANGE COLUMN event_descpription event_description VARCHAR(500);
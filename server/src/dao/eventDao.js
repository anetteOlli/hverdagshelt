// @flow
const Dao = require('./dao.js');

module.exports = class EventDao extends Dao {
  getAll(callback) {
    super.query('select * from event', [], callback);
  }

  getOne(id, callback) {
    super.query('select * from event where event_id=?', [id], callback);
  }

  getFromMunicipality(json, callback){
    const values = [
      json.municipality,
      json.county
    ];
    super.query(
      "SELECT * FROM event WHERE municipality_fk = ? AND county_fk = ?",
      values,
      callback
    )};

  createOne(json, callback) {
    const newContent = [
      json.event_name,
      json.event_description,
      json.event_img,
      json.date_starting,
      json.date_ending,
      json.status_fk,
      json.county_fk,
      json.municipality_fk,
      json.city_fk,
      json.street_fk,
      json.latitude,
      json.longitude
    ];
    super.query(
      'insert into event (event_name,event_description, event_img, date_starting, date_ending, status_fk, county_fk, municipality_fk, city_fk, street_fk, latitude, longitude) values (?,?,?,?,?,?,?,?,?,?,?,?)',
      newContent,
      callback
    );
  }

/**Må oppdateres før den kan brukes!*/
  patch(id, json, callback) {
    const values = [json.event_name, json.event_description, json.status_fk, json.user_fk, json.location_fk, id];

    super.query(
      'update event set event_name = ?, event_description = ?, status_fk = ?,  user_fk = ?, location_fk = ? where event_id = ?',
      values,
      callback
    );
  }
  deleteOne(id, callback) {
    super.query('delete from event where event_id=?', [id], callback);
  }
};

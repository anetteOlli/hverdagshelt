// @flow
const Dao = require('./dao.js');

module.exports = class EventDao extends Dao {
  getAll(callback) {
    super.query('select * from event', [], callback);
  }

  getOne(id, callback) {
    super.query('select * from event where event_id=?', [id], callback);
  }
<<<<<<< HEAD
=======

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
>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1

  createOne(json, callback) {
    const newContent = [
      json.event_name,
      json.event_description,
      json.status_fk,
      json.category_fk,
      json.user_fk,
      json.location_fk
    ];
    super.query(
      'insert into event (event_name,event_description,status_fk,user_fk,location_fk) values (?,?,?,?,?)',
      newContent,
      callback
    );
  }

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

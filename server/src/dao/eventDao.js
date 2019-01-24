// @flow
const Dao = require('./dao.js');

module.exports = class EventDao extends Dao {
  getAll(callback) {
    super.query('select * from event', [], callback);
  }

  getOne(id, callback) {
    super.query('select * from event where event_id=?', [id], callback);
  }

  getByMunicipality(json, callback) {
    const values = [json.municipality, json.county];
    super.query(
      'SELECT * FROM event WHERE municipality = ? AND county = ? AND date_ending >= CURRENT_TIMESTAMP',
      values,
      callback
    );
  }

  createOne(json, callback) {
    const newContent = [
      json.event_name,
      json.event_description,
      json.event_img,
      json.date_starting,
      json.date_ending,
      json.county,
      json.municipality,
      json.city,
      json.street,
      json.latitude,
      json.longitude,
      'Unchecked'
    ];
    super.query(
      'insert into event (event_name,event_description, event_img, date_starting, date_ending, county, municipality, city, street, latitude, longitude, status) values (?,?,?,?,?,?,?,?,?,?,?,?)',
      newContent,
      callback
    );
  }

  //status skal vel bort her?
  patch(id, json, callback) {
    const values = [
      json.event_name,
      json.event_description,
      json.event_img,
      json.date_starting,
      json.date_ending,
      json.status,
      json.county,
      json.municipality,
      json.city,
      json.street,
      json.latitude,
      json.longitude,
      id
    ];

    super.query(
      'update event set event_name = ?, event_description = ?, event_img = ?, date_starting = ?, date_ending = ?, status = ?, county = ?, municipality = ?, city = ?, street = ?, latitude = ?, longitude = ? where event_id = ?',
      values,
      callback
    );
  }
  deleteOne(id, callback) {
    super.query('delete from event where event_id=?', [id], callback);
  }
  updateStatus(callback) {
    super.query('update event set status = ? where date_ending <= CURRENT_TIMESTAMP', ['Finished'], callback);
    super.query('update event set status = ? where date_starting >= CURRENT_TIMESTAMP', ['Unchecked'], callback);
    super.query(
      'update event set status = ? where date_starting <= CURRENT_TIMESTAMP AND date_ending >= CURRENT_TIMESTAMP',
      ['InProgress'],
      callback
    );
  }
};

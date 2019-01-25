// @flow
const Dao = require('./dao.js');

module.exports = class EventDao extends Dao {

  /**
   * Retrieves all events from the database.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getAll(callback) {
    super.query('select * from event', [], callback);
  }

  /**
   * Retrieves an event from the database.
   * @param id The ID of the event.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getOne(id, callback) {
    super.query('select * from event where event_id=?', [id], callback);
  }

  /**
   * Retrieves all non-finished events located in a given municipality from the database.
   * @param json Object containing event data.
   * @param callback Returns table rows and status or an error code if something went wrong.
   */
  getByMunicipality(json, callback) {
    const values = [json.municipality, json.county];
    super.query(
      'SELECT * FROM event WHERE municipality = ? AND county = ? AND date_ending >= CURRENT_TIMESTAMP',
      values,
      callback
    );
  }

  /**
   * Creates an event row in the database.
   * @param json Object containing event data.
   * @param callback Returns the response from MySQL (status and data).
   */
  createOne(json, callback) {
    console.log('CreateOne Event DAO');
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

  /**
   * Updates an event row in the database.
   * @param id The ID of the event.
   * @param json Object containing event data.
   * @param callback Returns the response from MySQL (status and data).
   */
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

  /**
   * Deletes an event from the database.
   * @param id The ID of the event.
   * @param callback Returns the response from MySQL (status and data).
   */
  deleteOne(id, callback) {
    super.query('delete from event where event_id=?', [id], callback);
  }

  /**
   * Updates the status of all events in the database.
   * @param callback Returns the response from MySQL (status and data).
   */
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

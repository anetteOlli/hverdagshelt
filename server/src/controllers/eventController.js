/**
 * Module for handling the connection to the eventDao
 */


const image = require('../services/imageHostController').ImageHostController;
const EventDao = require('../dao/eventDao');
const DivDao = require('../dao/divDao');
const pool = require('../services/database');
let eventDao = new EventDao(pool);
let divDao = new DivDao(pool);

/**
 * Method for getting all the events in the system
 * @param callback Returns status and data from the eventDao
 */
exports.events_get_all = callback => {
  console.log('Handling GET requests to /events');
  eventDao.getAll((status, data) => {
    callback(status, data);
    eventDao.updateStatus(() => {});
  });
};

/**
 * Method for getting event given an id
 * @param id The id of the event you want to get
 * @param callback returns status and data from the eventdao
 */
exports.events_get_event = (id, callback) => {
  console.log('/events/' + id + ' fikk GET request fra klient');
  eventDao.getOne(id, (status, data) => {
    callback(status, data[0]);
  });
};

/**
 * Method for getting all the events given an municipality
 * @param json Object containing the wanted municipality
 * @param callback Return the status and data from the eventDao
 */
exports.events_get_from_municipality = (json, callback) => {
  console.log('/events/municipalities/' + json.municipality + '(' + json.county + ') fikk GET request fra klient');
  eventDao.getByMunicipality(json, (status, data) => {
    callback(status, data);
    eventDao.updateStatus(() => {});
  });
};

/**
 * Method for creating an event
 * @param file Object with the wanted img file for upload
 * @param json Object with event information
 * @param callback returns status and data from the eventDao
 */
exports.events_create_event = (file, json, callback) => {
  console.log('Fikk POST-request fra klienten');
  if (json.county === 'Nord-Trøndelag' || json.county === 'Sør-Trøndelag') json.county = 'Trøndelag';
  if (file === undefined) {
    eventDao.createOne(json, (status, data) => {
      handleError(status, data, json, callback);
    });
  } else {
    image.uploadImage(file, url => {
      json.event_img = url;
      eventDao.createOne(json, (status, data) => {
        handleError(status, data, json, callback);
      });
    });
  }

  /**
   * Helper function to minimize duplicate code
   * @param status Status code returned from the eventDao
   * @param data Data returned from the eventDao
   * @param json Object containing all the event information
   * @param callback returns status and data given different situations/branches
   */
  function handleError(status, data, json, callback) {
    if (status === 500) {
      divDao.createCity(json.city, () => {
        divDao.createStreet(json.street, () => {
          eventDao.createOne(json, (status, data) => {
            callback(status, data);
          });
        });
      });
    } else if (status === 200) {
      callback(status, data);
    } else {
      callback(404, { data: { error: "Couldn't add problem" } });
    }
  }
};
/**
 * Method for deleting an event given a specific id
 * @param id id of the event you want to delete
 * @param callback returns status and data from the eventDao
 */
exports.events_delete_event = (id, callback) => {
  console.log('/events/' + id + ' fikk request fra klient');
  eventDao.deleteOne(id, (status, data) => {
    callback(status, data);
  });
};

/**
 * Method for editing/updating an event given a specific id
 * @param id Id of the event you want to update
 * @param json Object containing the new information
 * @param callback returns status and data from the dao
 */
exports.events_edit_event = (id, json, callback) => {
  eventDao.patch(id, json, (status, data) => {
    callback(status, data);
  });
};

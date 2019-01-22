const image = require('../services/imageHostController').ImageHostController;

const EventDao = require('../dao/eventDao');
const DivDao = require('../dao/divDao');
const pool = require('../services/database');
let eventDao = new EventDao(pool);
let divDao = new DivDao(pool);

exports.events_get_all = (callback) => {
  console.log('Handling GET requests to /events');
  eventDao.getAll((status, data) => {
    console.log(data);
    callback(status,data);
  });
};

exports.events_get_event = (id,callback) => {
  console.log('/events/' + id + ' fikk GET request fra klient');
  eventDao.getOne(id, (status, data) => {
    callback(status,data[0]);
  });
};
exports.events_get_from_municipality = (json,callback) => {
  console.log(
    '/events/municipalities/' + json.municipality + '(' + json.county + ') fikk GET request fra klient'
  );
  eventDao.getByMunicipality(json, (status, data) => {
    callback(status,data);
  });
};

exports.events_create_event = (file,json, callback) => {
  console.log('Fikk POST-request fra klienten');
  if(json.county_fk === "Nord-Trøndelag" || json.county_fk === "Sør-Trøndelag") json.county_fk = "Trøndelag";
  if (file === undefined) {
    eventDao.createOne(json, (status, data) => {
      handleError(status,data,json,callback);
    });
  } else {
    image.uploadImage(file, url => {
      json.event_img = url;
      eventDao.createOne(json, (status, data) => {
        handleError(status,data,json,callback);
      });
    });
  }

  function handleError(status, data, json, callback){
    if(status === 500) {
      divDao.createCity(json.city_fk, () => {
        divDao.createStreet(json.street_fk, () => {
          eventDao.createOne(json, (status,data) => {
            callback(status,data);
          })
        })
      });
    } else if(status === 200) {
      callback(status,data)
    } else {
      callback({"status":404}, {"data": {"error":"Couldn't add problem"}});
    }
  }
};

exports.events_delete_event = (id,callback) => {
  console.log('/articles/' + id + ' fikk request fra klient');
  eventDao.deleteOne(id, (status, data) => {
    callback(status,data);
  });
};

exports.events_edit_event = (id,json,callback) => {
  eventDao.patch(id, json, (status, data) => {
    callback(status,data);
  });
};

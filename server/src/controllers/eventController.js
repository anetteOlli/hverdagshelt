const image = require('../services/imageHostController').ImageHostController;

const EventDao = require('../dao/eventDao');
const DivDao = require('../dao/divDao');
const pool = require('../services/database');
let eventDao = new EventDao(pool);
let divDao = new DivDao(pool);

exports.events_get_all = (req, res) => {
  console.log('Handling GET requests to /events');
  eventDao.getAll((status, data) => {
    //console.log(data);
    res.status(status).json(data);
    eventDao.updateStatus(() => {});
  });
};

exports.events_get_event = (req, res) => {
  console.log('/events/' + req.params.id + ' fikk GET request fra klient');
  eventDao.getOne(req.params.id, (status, data) => {
    res.status(status).json(data[0]);
  });
};
exports.events_get_from_municipality = (req, res) => {
  console.log(
    '/events/municipalities/' + req.body.municipality + '(' + req.body.county + ') fikk GET request fra klient'
  );
  eventDao.getByMunicipality(req.body, (status, data) => {
    res.status(status).json(data);
    eventDao.updateStatus(() => {});
  });
};

exports.events_create_event = (req, res) => {
  console.log('Fikk POST-request fra klienten');
  if(req.body.county_fk === "Nord-Trøndelag" || req.body.county_fk === "Sør-Trøndelag") req.body.county_fk = "Trøndelag";
  if (req.file === undefined) {
    eventDao.createOne(req.body, (status, data) => {
      handleError(status,data,req,res);
    });
  } else {
    image.uploadImage(req.file, url => {
      req.body.event_img = url;
      eventDao.createOne(req.body, (status, data) => {
        handleError(status,data,req,res);
      });
    });
  }

  function handleError(status, data, req, res){
    if(status === 500) {
      divDao.createCity(req.body.city_fk, () => {
        divDao.createStreet(req.body.street_fk, () => {
          eventDao.createOne(req.body, (status,data) => {
            res.status(status).json(data);
          })
        })
      });
    } else if(status === 200) {
      res.status(status).json(data);
    } else {
      res.status(404).json({"error":"Couldn't add problem"});
    }
  }
};

exports.events_delete_event = (req, res) => {
  console.log('/articles/' + req.params.id + ' fikk request fra klient');
  eventDao.deleteOne(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
};

exports.events_edit_event = (req, res) => {
  eventDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status).json(data);
  });
};

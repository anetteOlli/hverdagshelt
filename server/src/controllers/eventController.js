const EventDao = require('../dao/eventDao');
const pool = require('../services/database');
let eventDao = new EventDao(pool);

exports.events_get_all = (req, res) => {
  console.log('Handling GET requests to /events');
  eventDao.getAll((status, data) => {
    console.log(data);
    res.status(status).json(data);
  });
};

exports.events_get_event = (req, res) => {
  console.log('/events/' + req.params.id + ' fikk GET request fra klient');
  eventDao.getOne(req.params.id, (status, data) => {
    res.status(status).json({ message: 'fikk et "event" fra server' });
  });
};

exports.events_get_from_municipality = (req, res) => {
  console.log(
    '/events/municipality/' + req.body.municipality_fk + '(' + req.body.county_fk + ') fikk GET request fra klient'
  );
  eventDao.getFromMunicipality(req.body, (status, data) => {
    res.status(status).json(data);
  });
};

exports.events_create_event = (req, res) => {
  console.log('Fikk POST-request fra klienten');
  eventDao.createOne(req.body, (status, data) => {
    return res.status(status).json(data);
  });
};

exports.events_delete_event = (req, res) => {
  console.log('/articles/' + req.params.id + ' fikk request fra klient');
  eventDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
};

exports.events_edit_event = (req, res) => {
  eventDao.patch(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
};

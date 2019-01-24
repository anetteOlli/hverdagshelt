import { checkAuth } from '../services/util';
let upload = require('../services/imageHostController');

const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/', (req, res) => {
  EventController.events_get_all((status, data) => {
    res.status(status).json(data);
  });
});

router.get('/:id', (req, res) => {
  EventController.events_get_event(req.params.id, (status, data) => {
    res.stats(status).json(data);
  });
});

router.post('/municipality', (req, res) => {
  EventController.events_get_from_municipality(req.body, (status, data) => {
    res.status(status).json(data);
  });
});

router.post('/', checkAuth, upload.uploader, (req, res) => {
  EventController.events_create_event(req.file, req.body, (status, data) => {
    res.status(status).json(data);
  });
});

router.delete('/:id', checkAuth, (req, res) => {
  EventController.events_delete_event(req.params.id, (status, data) => {
    res.status(status).json(data);
  });
});

router.patch('/:id', checkAuth, (req, res) => {
  EventController.events_edit_event(req.params.id, req.body, (status, data) => {
    res.status(status).json(data);
  });
});

module.exports = router;

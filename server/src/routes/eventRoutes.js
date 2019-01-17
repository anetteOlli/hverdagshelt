import { checkAuth } from '../services/util';
let upload = require('../services/imageHostController');

const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.events_get_all);

router.get('/:id', EventController.events_get_event);

router.post('/municipality', EventController.events_get_from_municipality);

router.post('/', checkAuth, upload.uploader ,EventController.events_create_event);

router.delete('/:id', checkAuth, EventController.events_delete_event);

router.patch('/:id', checkAuth, EventController.events_edit_event);

module.exports = router;

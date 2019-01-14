import { checkAuth } from '../services/util';

const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.events_get_all);

router.get('/:id', EventController.events_get_event);

router.post('/municipality', EventController.events_get_from_municipality);

router.post('/', checkAuth, EventController.events_create_event);

router.delete('/:id', checkAuth, EventController.events_delete_event);

router.patch('/:id', checkAuth, EventController.events_edit_event);

module.exports = router;

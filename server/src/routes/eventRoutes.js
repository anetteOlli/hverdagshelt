import { checkAuth } from '../services/util';

const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.events_get_all);

router.get('/:id', EventController.events_get_event);

router.get('/municipality/:municipalityName', EventController.events_get_from_municipality);
=======
router.post('/municipality', EventController.events_get_from_municipality);

router.post('/', checkAuth, EventController.events_create_event);

router.delete('/:id', checkAuth, EventController.events_delete_event);

router.patch('/:id', checkAuth, EventController.events_edit_event);

>>>>>>> 0f9a11d459b0c7a8383c0dd3f473d8024ca0c4d1
module.exports = router;

const router = require('express').Router();
const EventController = require('../controllers/eventController');


router.get("/", EventController.events_get_all);

router.get("/:id", EventController.events_get_event);

router.post("/", EventController.events_create_event);

router.delete("/:id", EventController.events_delete_event);

router.patch("/:id", EventController.events_edit_event);

module.exports = router;
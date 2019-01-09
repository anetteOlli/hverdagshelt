// @flow
const router = require('express').Router();

router.use('/users', require("./userRoutes.js"));
router.use('/problems', require("./problemRoutes.js"));
router.use('/events', require("./eventRoutes.js"));
router.use('/locations', require("./locationRoutes.js"));

module.exports = router;



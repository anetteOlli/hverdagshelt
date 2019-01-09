// @flow
const router = require('express').Router();

router.use('/users', require("./userRoutes.js"));
router.use('/problems', require("./problemRoutes.js"));
router.use('/events', require("./eventRoutes.js"));
router.use('/locations', require("./locationRoutes.js"));
router.use('/',require("./divRoute"));

module.exports = router;



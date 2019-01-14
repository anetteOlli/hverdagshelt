// @flow
let express = require('express');
let router = express.Router();

router.use('/users', require("./userRoutes"));
router.use('/problems', require("./problemRoutes"));
router.use('/events', require("./eventRoutes"));
router.use('/div', require("./divRoutes"));
router.use('/categories', require("./categoryRoutes"));
router.use('/yeet', require("./divRoute"));

module.exports = router;

/*
if
throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
shows up make sure every routes file exports its router. Either don't include it in index or add module.exports = router
 */



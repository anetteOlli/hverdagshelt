const express = require('express');
const router = express.Router();
var mysql = require('mysql');
//const UserDao = require('../dao/userDao');

var pool = mysql.createPool({
    connectionLimit: 2,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'simenten',
    password: 'TOFcRtVk',
    database: 'simenten',
    debug: false
});





module.exports = router;
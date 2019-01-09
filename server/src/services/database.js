// @flow
const mysql = require('mysql');
//Set the value high, because for some reason if the conn limit was low the server would crash
const connAmount = 10000000;

//Creating the pool of connections
let pool = mysql.createPool({
    connectionLimit: connAmount,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'larssorl',
    password: '5QjoZeLq',
    database: 'larssorl',
    debug: false,
    multipleStatements: true
});
module.exports = pool;

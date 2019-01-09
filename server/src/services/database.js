// @flow
const mysql = require('mysql');
//Set the value high, because for some reason if the conn limit was low the server would crash
const connAmount = 10000000;

//Creating the pool of connections
let pool = mysql.createPool({
    connectionLimit: connAmount,
    host: process.env.MYSQL_HOST || 'test',
    user: process.env.MYSQL_USER || 'test',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'test',
    debug: false,
    multipleStatements: true
});
module.exports = pool;
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


/*
Probelems med current database:

Hvordan skal en entreprenør kobles til en kommune med innen en/flere spesifikk kategori?
Løsning: egen entrepenør table som kan kobles mot kommune: Lars har bilde på telf av db koblingen

Hvordan skal en differensiere med å lage en kommuneansatt? lage en entreprenør?
løsning: Bruker blir forandra av systemadministrator til å bli kommuneansatt, entreprenører har egen reg.

 */
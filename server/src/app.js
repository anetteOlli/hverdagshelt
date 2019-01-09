import express from 'express';
import path from 'path';
import reload from 'reload';
/*--- file system: to watch the public file to check if it is in production or not ---*/
import fs from 'fs';
//import logger from 'morgan';
const morgan = require('morgan');

const public_path = path.join(__dirname, '/../../client/public');
const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(express.static(public_path));
const routes = require('./routes');

/*--- Morgan logger for debug ---*/
app.use(morgan('dev'));

/*Henter alle routes her, fra index.*/
app.use('/', routes);

//false for å bare handle url-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
//extract json data og gjør det lettere leselig
app.use(bodyParser.json());


/*--- Hot reload application when not in production environment ---*/
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}

module.exports = app;
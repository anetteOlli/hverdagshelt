import express from 'express';
import path from 'path';
import reload from 'reload';
/*--- file system: to watch the public file to check if it is in production or not ---*/
import fs from 'fs';
import logger from 'morgan';

const public_path = path.join(__dirname, '/../../client/public');
const app = express();
app.use(express.static(public_path));

/*--- Morgan logger for debug ---*/
app.use(logger('dev'));

/*--- Body parser: (is in express by default now) ---*/
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

/*--- Hot reload application when not in production environment ---*/
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}

module.exports = app;
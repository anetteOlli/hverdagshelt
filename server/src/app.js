import express from 'express';
import path from 'path';
const morgan = require('morgan');

const public_path = path.join(__dirname, '/../../client/public');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(public_path));
const routes = require('./routes');

/*--- Morgan logger for debug ---*/
app.use(morgan('dev'));

//false for å bare handle url-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
//extract json data og gjør det lettere leselig
app.use(bodyParser.json());

/*Henter alle routes her, fra index.*/
app.use('/', routes);


/*--- Hot reload application when not in production environment ---
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}
*/
//custom 404 error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//returns error as json
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = app;
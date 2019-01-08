// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
/*--- file system: to watch the public file to check if it is in production or not ---*/
import fs from 'fs';
import logger from 'morgan';
import MailController from './services/nodemailer';

let mailController = new MailController();

const public_path = path.join(__dirname, '/../../client/public');
const app: express$Application = express();

app.use(express.static(public_path));

/*--- Morgan logger for debug ---*/
app.use(logger('dev'));

/*--- Body parser: (is in express by default now) ---*/
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

app.use('/send', (req,res) => {
  let notification = {
    email:'larssoerlie96@gmail.com',
    message:'YEEEEEEEEEEEEEEEET'
  };
  console.log(notification);
  mailController.sendActivationLink(notification);
  notification = {
    message:'YA YEEEEEEEEEEEEEEEEEEET'
  };
  let emails = ['larssoerlie96@gmail.com', 'larssorl@stud.ntnu.no'];
  mailController.sendMassMail(notification,emails);
});

/*--- Hot reload application when not in production environment ---*/
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

const PORT: number = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 3000;
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(PORT, error => {
    if (error) reject(error.message);
    console.log(`Server listening on port ${PORT}`);
    resolve();
  });
});
